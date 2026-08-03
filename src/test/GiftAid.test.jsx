import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GiftAidForm from '../components/GiftAidForm';

afterEach(() => {
  vi.restoreAllMocks();
});

async function fillValidForm(user) {
  await user.type(screen.getByLabelText('Full name *'), 'Jane Doe');
  await user.type(screen.getByLabelText('Email *'), 'jane@example.com');
  await user.click(screen.getByLabelText(/I confirm I pay enough tax/));
}

describe('GiftAidForm', () => {
  it('requires the declaration checkbox', async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn();

    render(<GiftAidForm />);
    await user.type(screen.getByLabelText('Full name *'), 'Jane Doe');
    await user.type(screen.getByLabelText('Email *'), 'jane@example.com');
    await user.click(screen.getByRole('button', { name: /Submit Declaration/i }));

    expect(await screen.findByText('Please confirm the declaration to continue.')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('submits successfully and shows confirmation', async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<GiftAidForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /Submit Declaration/i }));

    expect(await screen.findByText(/declaration has been received/)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/gift-aid',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('"consent":true'),
      }),
    );
  });

  it('surfaces the server error when the API fails', async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed to submit. Please try again.' }),
    });

    render(<GiftAidForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /Submit Declaration/i }));

    expect(await screen.findByText('Failed to submit. Please try again.')).toBeInTheDocument();
  });
});
