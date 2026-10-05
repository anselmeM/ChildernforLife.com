import { describe, it, expect, afterEach } from 'vitest';
import { CANONICAL_ORIGIN, resolveOrigin } from '../../../api/lib/origin.js';

const req = (origin) => ({ headers: origin === undefined ? {} : { origin } });

const savedEnv = {
  VERCEL_URL: process.env.VERCEL_URL,
  VERCEL_BRANCH_URL: process.env.VERCEL_BRANCH_URL,
};

afterEach(() => {
  delete process.env.VERCEL_URL;
  delete process.env.VERCEL_BRANCH_URL;
  if (savedEnv.VERCEL_URL) process.env.VERCEL_URL = savedEnv.VERCEL_URL;
  if (savedEnv.VERCEL_BRANCH_URL) process.env.VERCEL_BRANCH_URL = savedEnv.VERCEL_BRANCH_URL;
});

describe('resolveOrigin', () => {
  it('keeps the canonical and www origins', () => {
    expect(resolveOrigin(req(CANONICAL_ORIGIN))).toBe(CANONICAL_ORIGIN);
    expect(resolveOrigin(req('https://www.childrenforlife.com'))).toBe('https://www.childrenforlife.com');
  });

  it('keeps local development origins', () => {
    expect(resolveOrigin(req('http://localhost:5173'))).toBe('http://localhost:5173');
    expect(resolveOrigin(req('http://localhost:3000'))).toBe('http://localhost:3000');
  });

  it('tolerates a trailing slash', () => {
    expect(resolveOrigin(req(`${CANONICAL_ORIGIN}/`))).toBe(CANONICAL_ORIGIN);
  });

  // The regression this change fixes: a wildcard match on *.vercel.app let
  // anyone point a genuine Stripe checkout's post-payment redirect at their own
  // deployment.
  it('rejects an arbitrary vercel.app origin instead of trusting the wildcard', () => {
    expect(resolveOrigin(req('https://evil-gift.vercel.app'))).toBe(CANONICAL_ORIGIN);
    expect(resolveOrigin(req('https://anything-at-all.vercel.app'))).toBe(CANONICAL_ORIGIN);
    expect(resolveOrigin(req('https://childrenforlife.vercel.app.evil.example'))).toBe(CANONICAL_ORIGIN);
  });

  it('rejects lookalike and unlisted origins', () => {
    expect(resolveOrigin(req('https://childrenforlife.com.evil.example'))).toBe(CANONICAL_ORIGIN);
    expect(resolveOrigin(req('https://notchildrenforlife.com'))).toBe(CANONICAL_ORIGIN);
    expect(resolveOrigin(req('http://childrenforlife.com'))).toBe(CANONICAL_ORIGIN);
    // An Origin header never carries a path, so this can never be a match.
    expect(resolveOrigin(req('https://anselmemo.github.io/ChildernforLife.com'))).toBe(CANONICAL_ORIGIN);
  });

  it('falls back to the canonical origin when the header is missing, empty or null', () => {
    expect(resolveOrigin(req())).toBe(CANONICAL_ORIGIN);
    expect(resolveOrigin(req(''))).toBe(CANONICAL_ORIGIN);
    expect(resolveOrigin(req('null'))).toBe(CANONICAL_ORIGIN);
  });

  it('accepts this deployment\u2019s own vercel preview origin only', () => {
    process.env.VERCEL_URL = 'children-for-life-abc123.vercel.app';

    expect(resolveOrigin(req('https://children-for-life-abc123.vercel.app'))).toBe(
      'https://children-for-life-abc123.vercel.app',
    );
    expect(resolveOrigin(req('https://children-for-life-someone-else.vercel.app'))).toBe(CANONICAL_ORIGIN);
  });

  it('accepts the branch deployment origin', () => {
    process.env.VERCEL_BRANCH_URL = 'children-for-life-git-fix-thing.vercel.app';

    expect(resolveOrigin(req('https://children-for-life-git-fix-thing.vercel.app'))).toBe(
      'https://children-for-life-git-fix-thing.vercel.app',
    );
  });
});
