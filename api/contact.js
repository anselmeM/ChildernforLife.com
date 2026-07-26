import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing required environment variable: RESEND_API_KEY');
}

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'info@childrenforlife.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, message, subject } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const { error } = await resend.emails.send({
      from: 'Children for Life <contact@childrenforlife.com>',
      to: [TO_EMAIL],
      replyTo: email,
      subject: subject || `New message from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${message ? `<p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
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
