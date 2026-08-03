import { Resend } from 'resend';
import { isRateLimited } from './lib/rateLimit.js';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing required environment variable: RESEND_API_KEY');
}

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'info@childrenforlife.com';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_LENGTH = 200;

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

  if (isRateLimited(req)) {
    return res.status(429).json({ error: 'Too many attempts. Please try again later.' });
  }

  try {
    const { fullName, email, amount, consent } = req.body || {};

    if (typeof fullName !== 'string' || !fullName.trim() || fullName.length > MAX_LENGTH) {
      return res.status(400).json({ error: 'Please enter your name.' });
    }
    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim()) || email.length > MAX_LENGTH) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    if (consent !== true) {
      return res.status(400).json({ error: 'Please confirm the declaration to continue.' });
    }

    const amountText = typeof amount === 'string' ? amount.trim().slice(0, 50) : '';

    const { error } = await resend.emails.send({
      from: 'Children for Life <contact@childrenforlife.com>',
      to: [TO_EMAIL],
      replyTo: email.trim(),
      subject: `Tax Receipt / Gift Aid Declaration: ${fullName.trim()}`,
      html: `
        <h2>Tax Receipt / Gift Aid Declaration</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        ${amountText ? `<p><strong>Donation amount:</strong> ${escapeHtml(amountText)}</p>` : ''}
        <p><strong>Declaration confirmed:</strong> yes</p>
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
    console.error('Gift aid error:', error);
    return res.status(500).json({ error: 'Failed to submit. Please try again.' });
  }
}
