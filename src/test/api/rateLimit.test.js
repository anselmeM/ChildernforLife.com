import { describe, it, expect, beforeEach } from 'vitest';
import {
  RATE_LIMIT_WINDOW_MS,
  isRateLimited,
  rejectIfRateLimited,
  resetRateLimitStore,
} from '../../../api/lib/rateLimit.js';

const req = (headers) => ({ headers });

const res = () => {
  const response = { statusCode: null, payload: null, headers: {} };
  response.status = (code) => {
    response.statusCode = code;
    return response;
  };
  response.json = (payload) => {
    response.payload = payload;
    return response;
  };
  response.setHeader = (key, value) => {
    response.headers[key.toLowerCase()] = value;
  };
  return response;
};

describe('rate limiter client identity', () => {
  beforeEach(() => resetRateLimitStore());

  // Regression: the limiter used to key on the FIRST X-Forwarded-For entry,
  // which is attacker-supplied — rotating one header bypassed it entirely.
  it('keys on the proxy-appended rightmost entry, not the spoofable leftmost one', () => {
    for (let i = 0; i < 5; i += 1) {
      expect(isRateLimited(req({ 'x-forwarded-for': `${i}.${i}.${i}.${i}, 203.0.113.9` }))).toBe(false);
    }

    // Same real client, different spoofed prefix: still limited.
    expect(isRateLimited(req({ 'x-forwarded-for': '9.9.9.9, 203.0.113.9' }))).toBe(true);
  });

  it('ignores header junk rather than bucketing on it', () => {
    for (let i = 0; i < 5; i += 1) {
      expect(isRateLimited(req({ 'x-forwarded-for': `junk-${i}, 203.0.113.9` }))).toBe(false);
    }
    expect(isRateLimited(req({ 'x-forwarded-for': 'other-junk, 203.0.113.9' }))).toBe(true);
  });

  it('gives different client IPs different budgets', () => {
    for (let i = 0; i < 5; i += 1) {
      expect(isRateLimited(req({ 'x-forwarded-for': '198.51.100.1' }))).toBe(false);
    }
    expect(isRateLimited(req({ 'x-forwarded-for': '198.51.100.1' }))).toBe(true);
    expect(isRateLimited(req({ 'x-forwarded-for': '198.51.100.2' }))).toBe(false);
  });

  it('consults x-vercel-forwarded-for only when X-Forwarded-For is absent', () => {
    for (let i = 0; i < 5; i += 1) {
      expect(isRateLimited(req({ 'x-vercel-forwarded-for': '203.0.113.20' }))).toBe(false);
    }
    expect(isRateLimited(req({ 'x-vercel-forwarded-for': '203.0.113.20' }))).toBe(true);

    // A spoofed x-vercel-forwarded-for must not open a second bucket once the
    // platform header that it is meant to override is present.
    expect(
      isRateLimited(req({ 'x-forwarded-for': '203.0.113.20', 'x-vercel-forwarded-for': '1.1.1.1' })),
    ).toBe(true);
  });

  it('shares a single bucket when no client IP can be determined', () => {
    for (let i = 0; i < 5; i += 1) {
      expect(isRateLimited(req({}))).toBe(false);
    }
    expect(isRateLimited(req({}))).toBe(true);
  });
});

describe('rejectIfRateLimited', () => {
  beforeEach(() => resetRateLimitStore());

  it('answers 429 with Retry-After once the budget is spent', () => {
    const headers = { 'x-forwarded-for': '203.0.113.5' };
    for (let i = 0; i < 5; i += 1) {
      expect(rejectIfRateLimited(req(headers), res())).toBe(false);
    }

    const response = res();
    expect(rejectIfRateLimited(req(headers), response)).toBe(true);
    expect(response.statusCode).toBe(429);
    expect(response.headers['retry-after']).toBe(String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)));
    expect(response.payload.error).toMatch(/too many/i);
  });

  it('honours a custom budget for endpoints the success page hits repeatedly', () => {
    const headers = { 'x-forwarded-for': '203.0.113.6' };
    expect(rejectIfRateLimited(req(headers), res(), { max: 1 })).toBe(false);
    expect(rejectIfRateLimited(req(headers), res(), { max: 1 })).toBe(true);
  });
});
