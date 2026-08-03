import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MatchingGiftForm from '../components/MatchingGiftForm';

afterEach(() => {
  vi.restoreAllMocks();
});

async function fillValidForm(user) {
  await user.type(screen.getByLabelText('Your name *'), 'Jane Doe');
  await user.type(screen.getByLabelText('Work email *'), 'jane@example.com');
  await user.type(screen.getByLabelText('Employer *'), 'Acme Corp');
}

describe('MatchingGiftForm', () => {
  it('shows a validation error for missing fields without calling the API', async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn();

    render(<MatchingGiftForm />);
    await user.click(screen.getByRole('button', { name: /Request a Match/i }));

    expect(await screen.findByText('Please enter your name.')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('submits successfully and shows confirmation', async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<MatchingGiftForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /Request a Match/i }));

    expect(await screen.findByText(/Thank you — we'll be in touch/)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/matching-gift',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('"employeeName":"Jane Doe"'),
      }),
    );
  });

  it('surfaces the server error when the API fails', async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed to submit. Please try again.' }),
    });

    render(<MatchingGiftForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /Request a Match/i }));

    expect(await screen.findByText('Failed to submit. Please try again.')).toBeInTheDocument();
  });
});
