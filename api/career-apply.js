import { Resend } from 'resend';
import { isRateLimited } from './lib/rateLimit.js';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing required environment variable: RESEND_API_KEY');
}

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'info@childrenforlife.com';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_LENGTH = 200;
const MAX_NOTE_LENGTH = 2000;

// Keep in sync with the openings listed on the Careers page.
const POSITION_OPTIONS = [
  'Senior Program Manager (WASH)',
  'Monitoring & Evaluation (M&E) Specialist',
  'Communications & Media Relations Officer',
  'General application',
];

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
    const { firstName, lastName, email, position, note } = req.body || {};

    if (typeof firstName !== 'string' || !firstName.trim() || firstName.length > MAX_LENGTH) {
      return res.status(400).json({ error: 'Please enter your first name.' });
    }
    if (typeof lastName !== 'string' || !lastName.trim() || lastName.length > MAX_LENGTH) {
      return res.status(400).json({ error: 'Please enter your last name.' });
    }
    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim()) || email.length > MAX_LENGTH) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    const positionValue = POSITION_OPTIONS.includes(position) ? position : '';
    if (!positionValue) {
      return res.status(400).json({ error: 'Please choose a position.' });
    }

    const noteText = typeof note === 'string' ? note.trim().slice(0, MAX_NOTE_LENGTH) : '';

    const { error } = await resend.emails.send({
      from: 'Children for Life <contact@childrenforlife.com>',
      to: [TO_EMAIL],
      replyTo: email.trim(),
      subject: `Job Application: ${positionValue}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName.trim())} ${escapeHtml(lastName.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Position:</strong> ${escapeHtml(positionValue)}</p>
        ${noteText ? `<p><strong>Cover note:</strong></p><p>${escapeHtml(noteText).replace(/\n/g, '<br>')}</p>` : ''}
        <hr>
        <p style="color:#888;font-size:12px;">Sent from the childrenforlife.com careers page</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to submit. Please try again.' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Career apply error:', error);
    return res.status(500).json({ error: 'Failed to submit. Please try again.' });
  }
}
