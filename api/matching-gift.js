import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing required environment variable: RESEND_API_KEY');
}

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'info@childrenforlife.com';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_LENGTH = 200;

// Light per-IP rate limit (in-memory; per serverless instance).
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

  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many attempts. Please try again later.' });
  }

  try {
    const { employeeName, email, company, amount, note } = req.body || {};

    if (typeof employeeName !== 'string' || !employeeName.trim() || employeeName.length > MAX_LENGTH) {
      return res.status(400).json({ error: 'Please enter your name.' });
    }
    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim()) || email.length > MAX_LENGTH) {
      return res.status(400).json({ error: 'Please enter a valid work email address.' });
    }
    if (typeof company !== 'string' || !company.trim() || company.length > MAX_LENGTH) {
      return res.status(400).json({ error: 'Please enter your employer name.' });
    }

    const amountText = typeof amount === 'string' ? amount.trim().slice(0, 50) : '';
    const noteText = typeof note === 'string' ? note.trim().slice(0, 1000) : '';

    const { error } = await resend.emails.send({
      from: 'Children for Life <contact@childrenforlife.com>',
      to: [TO_EMAIL],
      replyTo: email.trim(),
      subject: `Matching Gift Request: ${company.trim()}`,
      html: `
        <h2>New Employer Matching Gift Request</h2>
        <p><strong>Employee:</strong> ${escapeHtml(employeeName.trim())}</p>
        <p><strong>Work email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Employer:</strong> ${escapeHtml(company.trim())}</p>
        ${amountText ? `<p><strong>Donation amount to match:</strong> ${escapeHtml(amountText)}</p>` : ''}
        ${noteText ? `<p><strong>Note:</strong></p><p>${escapeHtml(noteText).replace(/\n/g, '<br>')}</p>` : ''}
        <hr>
        <p style="color:#888;font-size:12px;">Sent from the childrenforlife.com donation page</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to submit. Please try again.' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Matching gift error:', error);
    return res.status(500).json({ error: 'Failed to submit. Please try again.' });
  }
}
