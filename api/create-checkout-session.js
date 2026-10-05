import Stripe from 'stripe';
import { resolveOrigin } from './lib/origin.js';
import { rejectIfRateLimited } from './lib/rateLimit.js';

const requiredVars = ['STRIPE_SECRET_KEY'];
const missing = requiredVars.filter(v => !process.env[v]);

if (missing.length) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Donation bounds: at least $1.00, at most $100,000 per transaction.
const MIN_AMOUNT_CENTS = 100;
const MAX_AMOUNT_CENTS = 10_000_000;

// The currency is decided here, not by the client. Donations are priced in TZS
// and charged in USD; a client-supplied currency could otherwise be a
// zero-decimal one (e.g. JPY), silently reinterpreting unit_amount.
const CURRENCY = 'usd';

// Only these product names may appear on Stripe's hosted page. Previously any
// client string was accepted, so anyone could mint a legitimate-looking Stripe
// payment page on this account with attacker-chosen text ("Children for Life
// Emergency Food Fund"). The names come from the donate page's tier list; the
// parity assertion in src/test/api/checkout.test.js fails CI if they drift.
const ALLOWED_TIER_NAMES = new Set([
  'Starter Support',
  'Core Care',
  'Strong Foundation',
  'Whole Home Sponsor',
  'Custom Donation',
]);
const MAX_TIER_NAME_LENGTH = 120;
const MAX_TIER_DESC_LENGTH = 500;

// Keep in sync with src/data/campaigns.js slugs. Only known campaigns are
// accepted as metadata — never trust arbitrary client values here.
const ALLOWED_CAMPAIGNS = new Set([
  'solar-powered-futures',
  'clean-water-schools',
  'girls-stem-scholarships',
]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (rejectIfRateLimited(req, res)) return;

  try {
    const { amount, currency, frequency, tierName, tierDesc, campaign, tribute } = req.body || {};
    const amountInCents = Math.round(Number(amount));

    if (!Number.isFinite(amountInCents) || amountInCents < MIN_AMOUNT_CENTS || amountInCents > MAX_AMOUNT_CENTS) {
      return res.status(400).json({ error: 'Donation amount must be between $1 and $100,000.' });
    }

    if (currency !== undefined && String(currency).toLowerCase() !== CURRENCY) {
      return res.status(400).json({ error: 'Unsupported currency.' });
    }

    const isSubscription = frequency === 'monthly';
    const requestedName = typeof tierName === 'string' ? tierName.trim() : '';

    if (requestedName && !ALLOWED_TIER_NAMES.has(requestedName)) {
      return res.status(400).json({ error: 'Unknown donation tier.' });
    }

    // Never fall back to client text: the server picks its own default.
    const productName = requestedName || (isSubscription ? 'Monthly Donation' : 'One-Time Donation');
    const productDescription =
      typeof tierDesc === 'string' ? tierDesc.trim().slice(0, MAX_TIER_DESC_LENGTH) : '';

    if (productName.length > MAX_TIER_NAME_LENGTH) {
      return res.status(400).json({ error: 'Unknown donation tier.' });
    }

    const campaignSlug = typeof campaign === 'string' && ALLOWED_CAMPAIGNS.has(campaign) ? campaign : '';
    const campaignPrefix = campaignSlug ? `${campaignSlug} · ` : '';

    // Tribute details are free text from the client — sanitize (strings only,
    // length-capped) before they go into Stripe metadata.
    const rawTribute = typeof tribute === 'object' && tribute !== null ? tribute : {};
    const cleanTribute = (key) => {
      const value = rawTribute[key];
      return typeof value === 'string' ? value.trim().slice(0, 200) : '';
    };
    const tributeMeta = {
      ...(cleanTribute('honoree') ? { tributeHonoree: cleanTribute('honoree') } : {}),
      ...(cleanTribute('recipientName') ? { tributeRecipientName: cleanTribute('recipientName') } : {}),
      ...(cleanTribute('recipientEmail') ? { tributeRecipientEmail: cleanTribute('recipientEmail') } : {}),
    };

    const origin = resolveOrigin(req);
    const successUrl = `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/donate?cancelled=true`;

    if (isSubscription) {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
          {
            price_data: {
              currency: CURRENCY,
              product_data: {
                name: `${campaignPrefix}${productName}`,
                description: productDescription,
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
          ...(campaignSlug ? { campaign: campaignSlug } : {}),
          ...tributeMeta,
        },
      });
      return res.status(200).json({ url: session.url });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: `${campaignPrefix}${productName}`,
              description: productDescription,
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
        ...(campaignSlug ? { campaign: campaignSlug } : {}),
        ...tributeMeta,
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe session error:', error);
    return res.status(500).json({ error: 'Unable to process payment. Please try again.' });
  }
}
