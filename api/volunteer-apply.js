import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing required environment variable: RESEND_API_KEY');
}

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'info@childrenforlife.com';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_LENGTH = 200;
const MAX_REASON_LENGTH = 2000;

const EXPERTISE_OPTIONS = [
  'Education & Literacy',
  'Healthcare & Sanitation (WASH)',
  'Renewable Energy & Technology',
  'Sustainable Agriculture',
  'Other / Administration',
];

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
    const { firstName, lastName, email, expertise, reason } = req.body || {};

    if (typeof firstName !== 'string' || !firstName.trim() || firstName.length > MAX_LENGTH) {
      return res.status(400).json({ error: 'Please enter your first name.' });
    }
    if (typeof lastName !== 'string' || !lastName.trim() || lastName.length > MAX_LENGTH) {
      return res.status(400).json({ error: 'Please enter your last name.' });
    }
    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim()) || email.length > MAX_LENGTH) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const expertiseValue = EXPERTISE_OPTIONS.includes(expertise) ? expertise : '';
    if (!expertiseValue) {
      return res.status(400).json({ error: 'Please choose an area of expertise.' });
    }

    const reasonText = typeof reason === 'string' ? reason.trim().slice(0, MAX_REASON_LENGTH) : '';

    const { error } = await resend.emails.send({
      from: 'Children for Life <contact@childrenforlife.com>',
      to: [TO_EMAIL],
      replyTo: email.trim(),
      subject: `Volunteer Application: ${firstName.trim()} ${lastName.trim()}`,
      html: `
        <h2>New Volunteer Application</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName.trim())} ${escapeHtml(lastName.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Area of expertise:</strong> ${escapeHtml(expertiseValue)}</p>
        ${reasonText ? `<p><strong>Why they want to volunteer:</strong></p><p>${escapeHtml(reasonText).replace(/\n/g, '<br>')}</p>` : ''}
        <hr>
        <p style="color:#888;font-size:12px;">Sent from the childrenforlife.com volunteer page</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to submit. Please try again.' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Volunteer apply error:', error);
    return res.status(500).json({ error: 'Failed to submit. Please try again.' });
  }
}
