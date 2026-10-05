import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { resetRateLimitStore } from '../../../api/lib/rateLimit.js';

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

vi.mock('resend', () => ({
  Resend: class {
    constructor() {
      this.emails = { send: sendMock };
    }
  },
}));

// The handler refuses to load without this, and it is checked at import time.
process.env.RESEND_API_KEY = 'test-key';

let handler;

beforeAll(async () => {
  ({ default: handler } = await import('../../../api/contact.js'));
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
  firstName: 'Grace',
  lastName: 'Hopper',
  email: 'grace@example.com',
  subject: 'Hello',
  message: 'I would like to help.',
};

const lastEmail = () => sendMock.mock.calls.at(-1)[0];

describe('POST /api/contact', () => {
  beforeEach(() => {
    resetRateLimitStore();
    sendMock.mockReset();
    sendMock.mockResolvedValue({ error: null });
  });

  it('rejects anything that is not a POST', async () => {
    const response = res();
    await handler(req({ method: 'GET' }), response);

    expect(response.statusCode).toBe(405);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('requires a name and an email address', async () => {
    const missingName = res();
    await handler(req({ body: { ...validBody, firstName: '' } }), missingName);
    expect(missingName.statusCode).toBe(400);

    const badEmail = res();
    await handler(req({ body: { ...validBody, email: 'not-an-email' } }), badEmail);
    expect(badEmail.statusCode).toBe(400);

    expect(sendMock).not.toHaveBeenCalled();
  });

  // The endpoint previously accepted anything containing '@' and passed it to
  // the mail API as replyTo. EMAIL_RE rejects all whitespace, so a CR/LF cannot
  // reach a header.
  it('rejects an email address containing CRLF instead of using it as replyTo', async () => {
    const response = res();
    await handler(
      req({ body: { ...validBody, email: 'attacker@example.com\r\nBcc: victim@example.com' } }),
      response,
    );

    expect(response.statusCode).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  // The regression this PR exists for: staff used to receive raw attacker HTML.
  it('escapes HTML submitted in the name and message', async () => {
    const response = res();
    await handler(
      req({
        body: {
          ...validBody,
          firstName: '<img src=x onerror="alert(1)">',
          message: '<script>alert("xss")</script>\nsecond line',
        },
      }),
      response,
    );

    expect(response.statusCode).toBe(200);
    const { html } = lastEmail();

    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img src=x');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('&lt;img src=x');
    // Legitimate newlines still become line breaks.
    expect(html).toContain('second line');
    expect(html).toContain('<br>');
  });

  it('collapses CRLF in the subject so it cannot inject a header', async () => {
    const response = res();
    await handler(
      req({ body: { ...validBody, subject: 'Invoice\r\nBcc: victim@example.com' } }),
      response,
    );

    expect(response.statusCode).toBe(200);
    const { subject } = lastEmail();
    expect(subject).not.toMatch(/[\r\n]/);
    expect(subject).toContain('Invoice Bcc: victim@example.com');
  });

  it('caps an oversized message instead of forwarding it', async () => {
    const response = res();
    await handler(req({ body: { ...validBody, message: 'a'.repeat(9000) } }), response);

    expect(response.statusCode).toBe(200);
    const { html } = lastEmail();
    expect(html).toContain('a'.repeat(5000));
    expect(html).not.toContain('a'.repeat(5001));
  });

  it('ignores a message that is not a string', async () => {
    const response = res();
    await handler(req({ body: { ...validBody, message: { toString: () => 'nope' } } }), response);

    expect(response.statusCode).toBe(200);
    expect(lastEmail().html).not.toContain('nope');
  });

  it('caps every accepted request with the rate limiter', async () => {
    const headers = { 'x-forwarded-for': '203.0.113.44' };

    for (let i = 0; i < 5; i += 1) {
      const ok = res();
      await handler(req({ body: validBody, headers }), ok);
      expect(ok.statusCode).toBe(200);
    }

    const limited = res();
    await handler(req({ body: validBody, headers }), limited);

    expect(limited.statusCode).toBe(429);
    expect(limited.headers['retry-after']).toBeDefined();
    expect(sendMock).toHaveBeenCalledTimes(5);
  });
});
