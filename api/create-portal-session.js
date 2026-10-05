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
    const { session_id, intent } = req.body || {};

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
    const hasActiveSubscription = activeSubscriptions.data.length > 0;

    // intent: 'check' is the read-only probe the thank-you page uses on mount.
    // It answers "is this a paid session with a recurring gift?" without
    // creating a Stripe billing-portal session for every visitor holding the
    // URL. The portal session is only created when the donor clicks through.
    if (intent === 'check') {
      return res.status(200).json({ mode: session.mode, hasActiveSubscription });
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${resolveOrigin(req)}/donate/success?session_id=${session_id}`,
    });

    return res.status(200).json({
      url: portal.url,
      mode: session.mode,
      hasActiveSubscription,
    });
  } catch (error) {
    console.error('Portal session error:', error);
    return res.status(500).json({ error: 'Unable to open the donation portal' });
  }
}
