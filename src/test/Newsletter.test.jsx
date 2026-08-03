import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsletterForm from '../components/NewsletterForm';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('NewsletterForm', () => {
  it('shows a validation error for an invalid email without calling the API', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    global.fetch = fetchMock;

    render(<NewsletterForm />);

    await user.type(screen.getByLabelText('Email address'), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('subscribes successfully and shows a confirmation', async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<NewsletterForm />);

    await user.type(screen.getByLabelText('Email address'), 'supporter@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(await screen.findByText(/Thanks! Please check your inbox/)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/subscribe',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'supporter@example.com' }),
      }),
    );
  });

  it('surfaces the server error when the API fails', async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed to subscribe. Please try again.' }),
    });

    render(<NewsletterForm />);

    await user.type(screen.getByLabelText('Email address'), 'supporter@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(await screen.findByText('Failed to subscribe. Please try again.')).toBeInTheDocument();
  });
});
