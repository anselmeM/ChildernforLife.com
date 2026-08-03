import Stripe from 'stripe';
import { resolveOrigin } from './lib/origin.js';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required environment variable: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session_id } = req.body || {};

    if (typeof session_id !== 'string' || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(session_id)) {
      return res.status(400).json({ error: 'Invalid session id' });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Only donors who actually completed checkout may mint portal sessions.
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Session is not paid' });
    }

    const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;

    if (!customerId) {
      return res.status(400).json({ error: 'No customer record found for this session' });
    }

    const activeSubscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1,
    });

    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${resolveOrigin(req)}/donate/success?session_id=${session_id}`,
    });

    return res.status(200).json({
      url: portal.url,
      mode: session.mode,
      hasActiveSubscription: activeSubscriptions.data.length > 0,
    });
  } catch (error) {
    console.error('Portal session error:', error);
    return res.status(500).json({ error: 'Unable to open the donation portal' });
  }
}
