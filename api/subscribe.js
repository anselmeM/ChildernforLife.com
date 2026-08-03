import { Resend } from 'resend';

const missing = ['RESEND_API_KEY', 'RESEND_AUDIENCE_ID'].filter((v) => !process.env[v]);
if (missing.length) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const FROM_EMAIL = 'Children for Life <newsletter@childrenforlife.com>';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 80;

// Simple per-IP rate limit (in-memory; per serverless instance — a mitigation,
// not a guarantee). Prevents the endpoint from being used as a spam pipe.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const requestsByIp = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (requestsByIp.get(ip) || []).filter((t) => t > windowStart);
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  requestsByIp.set(ip, timestamps);
  if (requestsByIp.size > 1000) {
    for (const [key, list] of requestsByIp) {
      if (list.every((t) => t <= windowStart)) requestsByIp.delete(key);
    }
  }
  return false;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: 'Too many attempts. Please try again later.' });
    }

    const { email, name } = req.body || {};

    if (typeof email !== 'string' || email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email.trim())) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const firstName = typeof name === 'string' ? name.trim().slice(0, MAX_NAME_LENGTH) : '';

    // Add to the newsletter audience. If the contact already exists, Resend
    // returns an error — treat that as success (idempotent subscribe).
    const { error: contactError } = await resend.contacts.create({
      email: normalizedEmail,
      firstName,
      audienceId: AUDIENCE_ID,
    });

    if (contactError && contactError.statusCode !== 409) {
      console.error('Resend contact error:', contactError);
      return res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
    }

    // Welcome email is best-effort: a list add is the critical path.
    const { error: emailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [normalizedEmail],
      subject: 'Welcome to Children for Life!',
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1f2937;">
          <div style="background:#005c7a;border-radius:12px 12px 0 0;padding:24px 32px;">
            <h1 style="color:#ffffff;margin:0;font-size:22px;">Children for Life</h1>
            <p style="color:#ffc72c;margin:6px 0 0;font-size:13px;">Every Child Deserves a Future</p>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:32px;">
            <h2 style="margin:0 0 8px;font-size:18px;">Welcome${firstName ? `, ${escapeHtml(firstName)}` : ''}!</h2>
            <p style="line-height:1.6;margin:0 0 16px;">
              Thank you for joining our newsletter. You'll hear about our programs in
              Benin, Cameroon, DR Congo, Ethiopia, Nigeria, and Tanzania — plus impact
              stories and ways to get involved.
            </p>
            <p style="font-size:12px;color:#6b7280;line-height:1.6;margin:16px 0 0;">
              You can unsubscribe anytime using the link in any email we send.
              Questions? Contact <a href="mailto:info@childrenforlife.com" style="color:#005c7a;">info@childrenforlife.com</a>.
            </p>
          </div>
        </div>
      `,
    });

    if (emailError) {
      // The subscription succeeded; don't fail the request over the welcome email.
      console.error('Welcome email error:', emailError);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
}
