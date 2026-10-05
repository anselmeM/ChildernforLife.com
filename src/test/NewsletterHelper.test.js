import { describe, it, expect, vi, beforeEach } from 'vitest';
import { subscribeToNewsletter } from '../lib/newsletter';

describe('subscribeToNewsletter', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('posts the trimmed email and name to /api/subscribe', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true }) });

    const result = await subscribeToNewsletter({ email: '  ada@example.com ', name: ' Ada Lovelace ' });

    expect(result).toEqual({ ok: true });
    const [url, options] = global.fetch.mock.calls.at(-1);
    expect(url).toBe('/api/subscribe');
    expect(options.method).toBe('POST');
    expect(JSON.parse(options.body)).toEqual({ email: 'ada@example.com', name: 'Ada Lovelace' });
  });

  it('rejects an invalid email without calling the API', async () => {
    const result = await subscribeToNewsletter({ email: 'not-an-email' });

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/valid email/i);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('omits an empty name rather than sending a blank first name', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

    await subscribeToNewsletter({ email: 'ada@example.com', name: '   ' });

    const [, options] = global.fetch.mock.calls.at(-1);
    expect(JSON.parse(options.body)).toEqual({ email: 'ada@example.com' });
  });

  it('caps the name at the API limit', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

    await subscribeToNewsletter({ email: 'ada@example.com', name: 'x'.repeat(200) });

    const [, options] = global.fetch.mock.calls.at(-1);
    expect(JSON.parse(options.body).name).toHaveLength(80);
  });

  it('surfaces the server error message', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Too many attempts. Please try again later.' }),
    });

    await expect(subscribeToNewsletter({ email: 'ada@example.com' })).resolves.toEqual({
      ok: false,
      error: 'Too many attempts. Please try again later.',
    });
  });

  it('falls back to a generic message when the error body is not JSON', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.reject(new Error('Unexpected token < in JSON')),
    });

    const result = await subscribeToNewsletter({ email: 'ada@example.com' });
    expect(result).toEqual({ ok: false, error: 'Could not subscribe. Please try again.' });
  });

  it('reports a network failure without throwing', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(subscribeToNewsletter({ email: 'ada@example.com' })).resolves.toEqual({
      ok: false,
      error: 'Could not subscribe. Please try again later.',
    });
  });
});
