import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import DonateSuccess from '../pages/DonateSuccess';

const SESSION_ID = 'cs_test_a1b2c3d4e5';

const ok = (body) => ({ ok: true, status: 200, json: () => Promise.resolve(body) });
const fail = (status, body = {}) => ({ ok: false, status, json: () => Promise.resolve(body) });

// The page makes two calls on mount (receipt = the payment check, and a
// read-only portal probe) plus one on demand when the donor opens the portal.
function mockApi({ receipt, portalProbe, portalCreate = ok({ url: 'https://billing.stripe.com/s/x' }) }) {
  let portalCalls = 0;
  global.fetch = vi.fn((url) => {
    if (url === '/api/send-receipt') return Promise.resolve(receipt);
    if (url === '/api/create-portal-session') {
      portalCalls += 1;
      return Promise.resolve(portalCalls === 1 ? portalProbe : portalCreate);
    }
    return Promise.reject(new Error(`Unexpected request to ${url}`));
  });
}

const portalRequests = () =>
  global.fetch.mock.calls.filter(([url]) => url === '/api/create-portal-session');

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/donate/success?session_id=${SESSION_ID}`]}>
        <DonateSuccess />
      </MemoryRouter>
    </HelmetProvider>,
  );

describe('DonateSuccess', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
    mockApi({
      receipt: ok({ success: true }),
      portalProbe: ok({ mode: 'payment', hasActiveSubscription: false }),
    });
  });

  it('only claims the donation is confirmed once the server confirms it', async () => {
    renderPage();

    expect(screen.getByText(/confirming your donation with Stripe/i)).toBeInTheDocument();
    expect(screen.queryByText(/Your donation is confirmed/i)).not.toBeInTheDocument();

    expect(await screen.findByText(/Your donation is confirmed/i)).toBeInTheDocument();
  });

  it('probes the portal read-only on mount', async () => {
    mockApi({
      receipt: ok({ success: true }),
      portalProbe: ok({ mode: 'subscription', hasActiveSubscription: true }),
    });

    renderPage();
    await screen.findByRole('button', { name: /Manage My Monthly Gift/i });

    expect(portalRequests()).toHaveLength(1);
    expect(JSON.parse(portalRequests()[0][1].body)).toEqual({
      session_id: SESSION_ID,
      intent: 'check',
    });
  });

  it('creates the portal session only after the donor clicks', async () => {
    mockApi({
      receipt: ok({ success: true }),
      portalProbe: ok({ mode: 'subscription', hasActiveSubscription: true }),
    });

    renderPage();
    fireEvent.click(await screen.findByRole('button', { name: /Manage My Monthly Gift/i }));

    await waitFor(() => expect(portalRequests()).toHaveLength(2));
    expect(JSON.parse(portalRequests()[1][1].body)).toEqual({ session_id: SESSION_ID });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('hides the manage button when there is no recurring gift', async () => {
    mockApi({
      receipt: ok({ success: true }),
      portalProbe: ok({ mode: 'payment', hasActiveSubscription: false }),
    });

    renderPage();

    await waitFor(() => expect(portalRequests()).toHaveLength(1));
    expect(screen.queryByRole('button', { name: /Manage My Monthly Gift/i })).not.toBeInTheDocument();
  });

  it('does not claim success when Stripe has not confirmed the payment', async () => {
    mockApi({ receipt: fail(400, { error: 'Session is not paid' }), portalProbe: fail(400) });

    renderPage();

    expect(await screen.findByText(/received confirmation of this payment yet/i)).toBeInTheDocument();
    expect(screen.queryByText(/Your donation is confirmed/i)).not.toBeInTheDocument();
  });

  it('admits it could not confirm when the server errors', async () => {
    mockApi({ receipt: fail(500, { error: 'Failed to send receipt' }), portalProbe: fail(500) });

    renderPage();

    expect(await screen.findByText(/couldn.t confirm your donation automatically/i)).toBeInTheDocument();
  });

  it('says it could not confirm when the network fails', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    renderPage();

    expect(await screen.findByText(/couldn.t confirm your donation automatically/i)).toBeInTheDocument();
  });
});
