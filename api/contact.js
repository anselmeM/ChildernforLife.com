import { Resend } from 'resend';
import { rejectIfRateLimited } from './lib/rateLimit.js';
import {
  MAX_EMAIL_LENGTH,
  cleanHeaderValue,
  cleanOptionalString,
  cleanString,
  escapeHtml,
  isValidEmail,
} from './lib/validation.js';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing required environment variable: RESEND_API_KEY');
}

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'info@childrenforlife.com';
const FROM_EMAIL = 'Children for Life <contact@childrenforlife.com>';

const MAX_NAME_LENGTH = 80;
const MAX_SUBJECT_LENGTH = 150;
const MAX_MESSAGE_LENGTH = 5000;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (rejectIfRateLimited(req, res)) return;

  try {
    const body = req.body || {};

    // Every field is type-checked, trimmed and length-capped. The previous
    // version validated only `email.includes('@')` and interpolated the rest
    // straight into the email, so an attacker could put arbitrary HTML in a
    // staff inbox (including links and tracking pixels) and submit unbounded
    // payloads.
    const firstName = cleanString(body.firstName, MAX_NAME_LENGTH);
    const lastName = cleanString(body.lastName, MAX_NAME_LENGTH);
    const email = cleanString(body.email, MAX_EMAIL_LENGTH);

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Subject is single-line and length-capped so it cannot inject a header.
    // It falls back to a composed one using CR/LF-stripped names.
    const requestedSubject = cleanHeaderValue(body.subject, MAX_SUBJECT_LENGTH);
    const safeName = cleanHeaderValue(`${firstName} ${lastName}`, MAX_NAME_LENGTH * 2);
    const subject = requestedSubject || `New message from ${safeName}`;
    const message = cleanOptionalString(body.message, MAX_MESSAGE_LENGTH);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      // Validated against EMAIL_RE, which rejects all whitespace — so this
      // cannot carry a CR/LF header injection either.
      replyTo: email,
      subject,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${message ? `<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
        <hr>
        <p style="color:#888;font-size:12px;">Sent from childrenforlife.com contact form</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send message' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
