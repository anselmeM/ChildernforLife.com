// Shared origin resolution for redirect URLs in Stripe flows.
// success_url / cancel_url / return_url are always built server-side from an
// allowlisted origin — never from the request body — so a payment can't land
// donors on an attacker-controlled page after checkout.

export const CANONICAL_ORIGIN = 'https://childrenforlife.com';

const ALLOWED_ORIGINS = new Set([
  CANONICAL_ORIGIN,
  'https://www.childrenforlife.com',
  'https://childernforlife-com.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'https://anselmemo.github.io',
  'https://anselmemo.github.io/ChildernforLife.com',
]);

// Vercel preview deployments use random hostnames under *.vercel.app.
const VERCEL_PREVIEW_RE = /^https:\/\/[a-z0-9-]+\.vercel\.app$/;

export function resolveOrigin(req) {
  const raw = String(req.headers.origin || '').replace(/\/+$/, '');
  if (ALLOWED_ORIGINS.has(raw) || VERCEL_PREVIEW_RE.test(raw)) return raw;
  return CANONICAL_ORIGIN;
}
