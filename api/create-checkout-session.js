import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency, frequency, tierName, tierDesc, cancelUrl, successUrl } = req.body;
    const amountInCents = Math.round(Number(amount));

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
              recurring: { interval: 'month' },
            },
            quantity: 1,
          },
        ],
        success_url: successUrl || `${req.headers.origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl || `${req.headers.origin}/donate?cancelled=true`,
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
      success_url: successUrl || `${req.headers.origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.origin}/donate?cancelled=true`,
      metadata: {
        source: 'childrenforlife.com',
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe session error:', error);
    return res.status(500).json({ error: error.message });
  }
}
