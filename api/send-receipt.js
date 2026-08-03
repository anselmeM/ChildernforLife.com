import Stripe from 'stripe';
import { Resend } from 'resend';

const missing = ['STRIPE_SECRET_KEY', 'RESEND_API_KEY'].filter((v) => !process.env[v]);
if (missing.length) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = 'Children for Life <donations@childrenforlife.com>';

// Idempotency guard: the session_id lives in the success-page URL, so it can be
// replayed (history/referrer logs). Track recently-receipted sessions to prevent
// duplicate receipt spam. Per-instance in-memory (serverless), which is a
// mitigation, not a guarantee — a persistent store would be the upgrade path.
const RECEIPT_TTL_MS = 24 * 60 * 60 * 1000;
const receiptedSessions = new Map();

function markReceiptSent(sessionId) {
  const now = Date.now();
  if (receiptedSessions.size > 500) {
    for (const [id, ts] of receiptedSessions) {
      if (now - ts > RECEIPT_TTL_MS) receiptedSessions.delete(id);
    }
  }
  receiptedSessions.set(sessionId, now);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatMoney(amountInCents, currency) {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amountInCents / 100);
  } catch {
    return `$${(amountInCents / 100).toFixed(2)}`;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session_id } = req.body || {};

    if (typeof session_id !== 'string' || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(session_id)) {
      return res.status(400).json({ error: 'Invalid session id' });
    }

    // Already receipted for this session — no-op so replays can't spam the inbox.
    if (receiptedSessions.has(session_id)) {
      return res.status(200).json({ success: true, duplicate: true });
    }

    // Never trust client-supplied amounts/emails: pull the truth from Stripe.
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Session is not paid' });
    }

    const email = session.customer_details?.email;
    const name = session.customer_details?.name || 'Friend';
    if (!email) {
      return res.status(400).json({ error: 'No customer email on session' });
    }

    const amountLabel = formatMoney(session.amount_total || 0, session.currency || 'usd');
    const isMonthly = session.mode === 'subscription';
    const dateLabel = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: `Thank you for your ${isMonthly ? 'monthly ' : ''}donation to Children for Life`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1f2937;">
          <div style="background:#005c7a;border-radius:12px 12px 0 0;padding:24px 32px;">
            <h1 style="color:#ffffff;margin:0;font-size:22px;">Children for Life</h1>
            <p style="color:#ffc72c;margin:6px 0 0;font-size:13px;">Every Child Deserves a Future</p>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:32px;">
            <h2 style="margin:0 0 8px;font-size:18px;">Dear ${escapeHtml(name)},</h2>
            <p style="line-height:1.6;margin:0 0 16px;">Thank you for your generous
              ${isMonthly ? 'monthly' : 'one-time'} donation of
              <strong>${escapeHtml(amountLabel)}</strong> on ${dateLabel}.
              Your support protects, educates, and empowers vulnerable children across Africa.</p>
            <table style="border-collapse:collapse;width:100%;font-size:14px;margin:16px 0;">
              <tr>
                <td style="padding:8px 0;color:#6b7280;">Donation amount</td>
                <td style="padding:8px 0;text-align:right;font-weight:bold;">${escapeHtml(amountLabel)}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6b7280;">Frequency</td>
                <td style="padding:8px 0;text-align:right;">${isMonthly ? 'Monthly (recurring)' : 'One-time'}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6b7280;">Payment method</td>
                <td style="padding:8px 0;text-align:right;">${escapeHtml((session.payment_method_types || []).join(', ') || 'Card')}</td>
              </tr>
            </table>
            <p style="font-size:12px;color:#6b7280;line-height:1.6;margin:16px 0 0;">
              This email confirms your donation to Children for Life. Please save it for your records.
              If you have any questions, reply to this email or contact us at
              <a href="mailto:info@childrenforlife.com" style="color:#005c7a;">info@childrenforlife.com</a>.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Receipt Resend error:', error);
      return res.status(500).json({ error: 'Failed to send receipt' });
    }

    markReceiptSent(session_id);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Receipt error:', error);
    return res.status(500).json({ error: 'Failed to send receipt' });
  }
}
