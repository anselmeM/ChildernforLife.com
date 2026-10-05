import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Keep this focused on the subscribe path. The scroll-reveal animations need
// gsap + ScrollTrigger and a real layout, which jsdom does not provide.
vi.mock('../hooks/useScrollReveal', () => ({ default: () => ({ current: null }) }));

import Home from '../pages/Home';

const renderHome = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </HelmetProvider>,
  );

const fillHeroForm = ({ first = 'Ada', last = 'Lovelace', email = 'ada@example.com' } = {}) => {
  fireEvent.change(screen.getByLabelText('First Name (required)'), { target: { value: first } });
  fireEvent.change(screen.getByLabelText('Last Name (required)'), { target: { value: last } });
  fireEvent.change(screen.getByLabelText('Email (required)'), { target: { value: email } });
  fireEvent.click(screen.getByRole('button', { name: /^submit$/i }));
};

describe('home page newsletter form', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  // Regression: this form posted to /api/contact, which emails staff and never
  // adds the visitor to the newsletter audience — while claiming success.
  it('subscribes through /api/subscribe rather than the contact form', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ success: true }) });

    renderHome();
    fillHeroForm();

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const [url, options] = global.fetch.mock.calls.at(-1);
    expect(url).toBe('/api/subscribe');
    expect(JSON.parse(options.body)).toEqual({ email: 'ada@example.com', name: 'Ada Lovelace' });

    expect(await screen.findByText(/you're subscribed/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Email (required)')).toHaveValue('');
  });

  it('shows the server error and keeps the entered email when subscribing fails', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Too many attempts. Please try again later.' }),
    });

    renderHome();
    fillHeroForm();

    expect(await screen.findByRole('alert')).toHaveTextContent(/too many attempts/i);
    expect(screen.getByLabelText('Email (required)')).toHaveValue('ada@example.com');
    expect(screen.queryByText(/you're subscribed/i)).not.toBeInTheDocument();
  });
});
