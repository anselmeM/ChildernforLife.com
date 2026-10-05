// Shared origin resolution for redirect URLs in Stripe flows.
// success_url / cancel_url / return_url are always built server-side from an
// allowlisted origin — never from the request body — so a payment can't land
// donors on an attacker-controlled page after checkout.
//
// The allowlist must stay exact. This file previously accepted ANY
// https://<something>.vercel.app origin, which meant anyone could deploy their
// own Vercel app, POST here with that Origin, and be handed a genuine Stripe
// Checkout link for this charity whose post-payment redirect pointed at their
// page — a convincing "your card was declined, re-enter your details" phishing
// chain, with a real donation taken. Only origins belonging to this project are
// accepted now.

export const CANONICAL_ORIGIN = 'https://childrenforlife.com';

const ALLOWED_ORIGINS = new Set([
  CANONICAL_ORIGIN,
  'https://www.childrenforlife.com',
  // This project's own Vercel production alias.
  'https://childernforlife-com.vercel.app',
  // GitHub Pages fallback. An Origin header never contains a path.
  'https://anselmemo.github.io',
  'http://localhost:5173',
  'http://localhost:3000',
]);

/**
 * The Vercel preview/branch deployment serving this request, if any. The
 * platform injects these per deployment, so they identify this project's own
 * deployments rather than an arbitrary one.
 */
function platformOrigins() {
  return [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL]
    .filter(Boolean)
    .map((host) => `https://${String(host).replace(/^https?:\/\//, '').replace(/\/+$/, '')}`);
}

export function resolveOrigin(req) {
  const raw = String(req.headers.origin || '').replace(/\/+$/, '');
  if (ALLOWED_ORIGINS.has(raw)) return raw;
  if (platformOrigins().includes(raw)) return raw;
  return CANONICAL_ORIGIN;
}
