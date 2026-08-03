import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VolunteerApplyForm from '../components/VolunteerApplyForm';

afterEach(() => {
  vi.restoreAllMocks();
});

async function fillValidForm(user) {
  await user.type(screen.getByLabelText('First Name *'), 'Jane');
  await user.type(screen.getByLabelText('Last Name *'), 'Doe');
  await user.type(screen.getByLabelText('Email Address *'), 'jane@example.com');
}

describe('VolunteerApplyForm', () => {
  it('shows a validation error for missing fields without calling the API', async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn();

    render(<VolunteerApplyForm />);
    await user.click(screen.getByRole('button', { name: /Submit Application/i }));

    expect(await screen.findByText('Please enter your full name.')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('submits successfully and shows confirmation', async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<VolunteerApplyForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /Submit Application/i }));

    expect(await screen.findByText(/Application submitted/)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/volunteer-apply',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('"firstName":"Jane"'),
      }),
    );
  });

  it('surfaces the server error when the API fails', async () => {
    const user = userEvent.setup();
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed to submit. Please try again.' }),
    });

    render(<VolunteerApplyForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /Submit Application/i }));

    expect(await screen.findByText('Failed to submit. Please try again.')).toBeInTheDocument();
  });
});
