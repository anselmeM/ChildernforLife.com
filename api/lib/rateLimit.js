import { isIP } from 'node:net';

// Shared in-memory per-IP rate limiter for public POST endpoints.
//
// Two caveats stated plainly, because both matter when reasoning about abuse:
//
//  1. The store lives in the serverless instance, so the effective budget is
//     `max × live instances` per window and resets on a cold start. It raises
//     the cost of abuse; it is not a guarantee. A shared store (Vercel KV,
//     Upstash) is the upgrade path.
//  2. The client identity must come from the hop the platform appended. Earlier
//     X-Forwarded-For entries are attacker-supplied: reading those (as this file
//     used to) let anyone rotate a header and bypass the limiter entirely.

export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const requestsByIp = new Map();

/** Rightmost entry that actually parses as an IP address. */
function rightmostValidIp(headerValue) {
  const parts = String(headerValue || '').split(',');
  for (let i = parts.length - 1; i >= 0; i -= 1) {
    const candidate = parts[i].trim();
    if (candidate && isIP(candidate)) return candidate;
  }
  return '';
}

function clientIp(req) {
  const headers = req?.headers || {};

  // Vercel appends the real client IP as the LAST X-Forwarded-For entry, so the
  // rightmost valid value is the only one we can trust.
  const forwarded = rightmostValidIp(headers['x-forwarded-for']);
  if (forwarded) return forwarded;

  // x-vercel-forwarded-for is set by the platform. Only consulted when
  // X-Forwarded-For is absent, and only when it parses as an IP.
  const vercel = rightmostValidIp(headers['x-vercel-forwarded-for']);
  if (vercel) return vercel;

  const socketIp = req?.socket?.remoteAddress;
  if (typeof socketIp === 'string' && isIP(socketIp)) return socketIp;

  // No trustworthy identity: these requests share one bucket rather than
  // escaping the limiter.
  return 'unknown';
}

export function isRateLimited(req, { max = RATE_LIMIT_MAX, windowMs = RATE_LIMIT_WINDOW_MS } = {}) {
  const now = Date.now();
  const windowStart = now - windowMs;

  // Bound memory: prune entries whose windows have fully elapsed.
  if (requestsByIp.size > 1000) {
    for (const [key, list] of requestsByIp) {
      if (list.every((t) => t <= windowStart)) requestsByIp.delete(key);
    }
  }

  const ip = clientIp(req);
  const timestamps = (requestsByIp.get(ip) || []).filter((t) => t > windowStart);
  if (timestamps.length >= max) return true;
  timestamps.push(now);
  requestsByIp.set(ip, timestamps);
  return false;
}

/**
 * Sends a 429 (with Retry-After) when the caller is over budget.
 *
 * @returns {boolean} true when the request was rejected and a response sent.
 */
export function rejectIfRateLimited(req, res, options = {}) {
  if (!isRateLimited(req, options)) return false;

  const windowMs = options.windowMs ?? RATE_LIMIT_WINDOW_MS;
  if (typeof res.setHeader === 'function') {
    res.setHeader('Retry-After', String(Math.ceil(windowMs / 1000)));
  }
  res.status(429).json({ error: 'Too many attempts. Please try again later.' });
  return true;
}

// The store is module state, so tests need a clean slate between cases.
export function resetRateLimitStore() {
  requestsByIp.clear();
}
