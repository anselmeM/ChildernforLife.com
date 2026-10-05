import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { CANONICAL_ORIGIN } from '../../../api/lib/origin.js';
import { resetRateLimitStore } from '../../../api/lib/rateLimit.js';

const { createMock } = vi.hoisted(() => ({ createMock: vi.fn() }));

vi.mock('stripe', () => ({
  default: class {
    constructor() {
      this.checkout = { sessions: { create: createMock } };
    }
  },
}));

process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';

let handler;

beforeAll(async () => {
  ({ default: handler } = await import('../../../api/create-checkout-session.js'));
});

const req = ({ method = 'POST', body = {}, headers = {} } = {}) => ({ method, body, headers });

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

const validBody = {
  amount: 10000,
  currency: 'usd',
  frequency: 'one-off',
  tierName: 'Starter Support',
  tierDesc: 'Hygiene & basic learning needs',
  campaign: 'clean-water-schools',
};

const createdSession = () => createMock.mock.calls.at(-1)[0];
const lineItem = () => createdSession().line_items[0].price_data;

// The tier names the donate page can actually send. They live in
// src/data/donationTiers.js once that module exists, and inline in the page
// before that.
function clientTierNames() {
  const candidates = ['src/data/donationTiers.js', 'src/pages/Donate.jsx'];
  const file = candidates.map((p) => join(process.cwd(), p)).find((p) => existsSync(p));
  if (!file) throw new Error('Could not locate the donation tier definitions');

  const names = [...readFileSync(file, 'utf8').matchAll(/^\s*name: '([^']+)',\s*$/gm)].map((m) => m[1]);
  return names;
}

function apiTierAllowlist() {
  const source = readFileSync(join(process.cwd(), 'api', 'create-checkout-session.js'), 'utf8');
  const block = source.match(/ALLOWED_TIER_NAMES = new Set\(\[([\s\S]*?)\]\)/);
  if (!block) throw new Error('Could not read ALLOWED_TIER_NAMES from the checkout API');
  return [...block[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

describe('POST /api/create-checkout-session', () => {
  beforeEach(() => {
    // The endpoint is rate-limited (5 per window per IP); every case here comes
    // from the same test client, so without a reset the later cases would see
    // 429 instead of the response under test.
    resetRateLimitStore();
    createMock.mockReset();
    createMock.mockResolvedValue({ url: 'https://checkout.stripe.com/test' });
  });

  it('decides the currency server-side and rejects anything else', async () => {
    const rejected = res();
    await handler(req({ body: { ...validBody, currency: 'jpy' } }), rejected);

    expect(rejected.statusCode).toBe(400);
    expect(createMock).not.toHaveBeenCalled();

    const accepted = res();
    await handler(req({ body: { ...validBody, currency: undefined } }), accepted);

    expect(accepted.statusCode).toBe(200);
    expect(lineItem().currency).toBe('usd');
  });

  it('rejects a client-chosen product name', async () => {
    const response = res();
    await handler(
      req({ body: { ...validBody, tierName: 'Children for Life Emergency Food Fund' } }),
      response,
    );

    expect(response.statusCode).toBe(400);
    expect(createMock).not.toHaveBeenCalled();
  });

  it('accepts a known tier and labels the session with it', async () => {
    const response = res();
    await handler(req({ body: validBody }), response);

    expect(response.statusCode).toBe(200);
    expect(lineItem().product_data.name).toBe('clean-water-schools · Starter Support');
    expect(lineItem().unit_amount).toBe(10000);
  });

  it('caps the description rather than forwarding arbitrary text', async () => {
    const response = res();
    await handler(req({ body: { ...validBody, tierDesc: 'd'.repeat(900) } }), response);

    expect(response.statusCode).toBe(200);
    expect(lineItem().product_data.description).toHaveLength(500);
  });

  it('rejects out-of-range and missing amounts without calling Stripe', async () => {
    for (const amount of [0, -1000, 10_000_001, undefined, 'abc']) {
      const response = res();
      await handler(req({ body: { ...validBody, amount } }), response);
      expect(response.statusCode, `amount=${amount}`).toBe(400);
    }
    expect(createMock).not.toHaveBeenCalled();
  });

  it('does not fail with a 500 on an empty body', async () => {
    const response = res();
    await handler(req({ body: undefined }), response);

    expect(response.statusCode).toBe(400);
  });

  // The post-payment destination must never be attacker-controlled.
  it('ignores a hostile Origin and redirects back to the canonical site', async () => {
    const response = res();
    await handler(
      req({ body: validBody, headers: { origin: 'https://evil-gift.vercel.app' } }),
      response,
    );

    expect(response.statusCode).toBe(200);
    expect(createdSession().success_url).toBe(
      `${CANONICAL_ORIGIN}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
    );
    expect(createdSession().cancel_url).toBe(`${CANONICAL_ORIGIN}/donate?cancelled=true`);
  });

  it('is a POST-only endpoint', async () => {
    const response = res();
    await handler(req({ method: 'GET', body: validBody }), response);

    expect(response.statusCode).toBe(405);
    expect(createMock).not.toHaveBeenCalled();
  });
});

describe('tier name allowlist parity', () => {
  it('allows every tier the donate page can send', () => {
    const clientNames = clientTierNames();
    const allowed = apiTierAllowlist();

    expect(clientNames.length).toBeGreaterThanOrEqual(4);

    const missing = clientNames.filter((name) => !allowed.includes(name));
    expect(missing, `The API would reject these tiers: ${missing.join(', ')}`).toEqual([]);
  });

  it('allows the custom-amount product name the page sends', () => {
    expect(apiTierAllowlist()).toContain('Custom Donation');
  });
});
