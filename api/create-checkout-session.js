import Stripe from 'stripe';
import { resolveOrigin } from './lib/origin.js';

const requiredVars = ['STRIPE_SECRET_KEY'];
const missing = requiredVars.filter(v => !process.env[v]);

if (missing.length) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Donation bounds: at least $1.00, at most $100,000 per transaction.
const MIN_AMOUNT_CENTS = 100;
const MAX_AMOUNT_CENTS = 10_000_000;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency, frequency, tierName, tierDesc } = req.body;
    const amountInCents = Math.round(Number(amount));

    if (!Number.isFinite(amountInCents) || amountInCents < MIN_AMOUNT_CENTS || amountInCents > MAX_AMOUNT_CENTS) {
      return res.status(400).json({ error: 'Donation amount must be between $1 and $100,000.' });
    }

    const origin = resolveOrigin(req);
    const successUrl = `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/donate?cancelled=true`;
    const isSubscription = frequency === 'monthly';

    if (isSubscription) {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
          {
            price_data: {
              currency: currency || 'usd',
              product_data: {
                name: tierName || 'Monthly Donation',
                description: tierDesc || '',
              },
              unit_amount: amountInCents,
              recurring: { interval: 'monthly' },
            },
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          source: 'childrenforlife.com',
        },
      });
      return res.status(200).json({ url: session.url });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: currency || 'usd',
            product_data: {
              name: tierName || 'One-Time Donation',
              description: tierDesc || '',
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      // Always create a customer record so donors can manage gifts via the billing portal.
      customer_creation: 'always',
      metadata: {
        source: 'childrenforlife.com',
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe session error:', error);
    return res.status(500).json({ error: 'Unable to process payment. Please try again.' });
  }
}
