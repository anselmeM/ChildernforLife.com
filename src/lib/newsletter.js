// The single place that talks to POST /api/subscribe.
//
// Why this exists: the home-page hero form used to POST to /api/contact — a
// staff-contact endpoint that never adds anyone to the newsletter audience —
// while telling the visitor "Thank you! You're subscribed." The footer form
// used /api/subscribe. Both forms now share this helper, so there is exactly
// one subscribe path to test and to reason about.

export const NEWSLETTER_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Mirrors MAX_NAME_LENGTH in api/subscribe.js.
const MAX_NAME_LENGTH = 80;

/**
 * Subscribes an email address to the Resend newsletter audience.
 *
 * @param {{ email: string, name?: string }} input
 * @returns {Promise<{ ok: true } | { ok: false, error: string }>}
 */
export async function subscribeToNewsletter({ email, name = '' }) {
  const trimmedEmail = String(email ?? '').trim();
  const trimmedName = String(name ?? '').trim().slice(0, MAX_NAME_LENGTH);

  if (!NEWSLETTER_EMAIL_RE.test(trimmedEmail)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }

  // Omit an empty name rather than sending "" — the API stores it as the
  // contact's first name.
  const payload = { email: trimmedEmail };
  if (trimmedName) payload.name = trimmedName;

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));

    if (res.ok) return { ok: true };
    return { ok: false, error: data.error || 'Could not subscribe. Please try again.' };
  } catch {
    return { ok: false, error: 'Could not subscribe. Please try again later.' };
  }
}
