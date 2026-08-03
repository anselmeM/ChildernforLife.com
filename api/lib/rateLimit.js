// Shared in-memory per-IP rate limiter for public POST endpoints.
// Vercel appends the real client IP as the LAST value of x-forwarded-for, and
// sets x-vercel-forwarded-for; earlier values may be attacker-controlled.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const requestsByIp = new Map();

function clientIp(req) {
  const vercel = req.headers['x-vercel-forwarded-for'];
  if (typeof vercel === 'string' && vercel.trim()) {
    return vercel.split(',')[0].trim();
  }
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd) {
    const parts = fwd.split(',').map((s) => s.trim()).filter(Boolean);
    // The rightmost value is the one appended by the proxy — trust it.
    return parts[parts.length - 1] || 'unknown';
  }
  return req.socket?.remoteAddress || 'unknown';
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
