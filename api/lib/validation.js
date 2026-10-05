// Shared input handling for the public POST endpoints.
//
// Every mail endpoint needs the same four things: a string type check, a length
// cap, CR/LF stripping before a value reaches a mail header, and HTML escaping
// before a value is interpolated into an email body. Those helpers were
// copy-pasted per file — and api/contact.js, the one endpoint that forgot them,
// was injectable. Centralising them means an endpoint cannot get it subtly
// wrong by omission.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const MAX_EMAIL_LENGTH = 254;

/** Escapes a value for interpolation into an HTML email body. */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Trims a required string field and enforces a maximum length.
 * @returns {string|null} the trimmed value, or null when it is missing/too long.
 */
export function cleanString(value, maxLength) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength) return null;
  return trimmed;
}

/** Trims an optional string field, truncating it at maxLength. */
export function cleanOptionalString(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

/**
 * A single-line value safe for a mail header (subject, reply-to). Collapses
 * CR/LF so a submitted value cannot inject additional headers.
 */
export function cleanHeaderValue(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, maxLength);
}

/** True when the value looks like a usable email address. */
export function isValidEmail(value) {
  return (
    typeof value === 'string' &&
    value.length <= MAX_EMAIL_LENGTH &&
    EMAIL_RE.test(value.trim())
  );
}
