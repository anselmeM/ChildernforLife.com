import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Donate from '../pages/Donate';

describe('Donation Flow', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('displays error when API call fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <MemoryRouter>
        <Donate />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /Confirm Gift/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Unable to connect/)).toBeInTheDocument();
    });
  });

  it('displays error when API returns error', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'Test error' }),
    });

    render(
      <MemoryRouter>
        <Donate />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /Confirm Gift/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Test error/)).toBeInTheDocument();
    });
  });

  it('toggles between monthly and one-off frequency', async () => {
    render(
      <MemoryRouter>
        <Donate />
      </MemoryRouter>
    );

    const oneOffButton = screen.getByText('One-off');
    await userEvent.click(oneOffButton);
    expect(oneOffButton).toHaveClass('bg-[#005c7a]');

    const monthlyButton = screen.getByText('Monthly');
    await userEvent.click(monthlyButton);
    expect(monthlyButton).toHaveClass('bg-[#005c7a]');
  });

  it('selects a tier and shows checkmark', async () => {
    render(
      <MemoryRouter>
        <Donate />
      </MemoryRouter>
    );

    const tier = screen.getByText('Starter Support');
    await userEvent.click(tier);

    const checkmarkIcons = screen.getAllByText('✓');
    expect(checkmarkIcons.length).toBe(1);
  });

  it('shows cancelled banner when ?cancelled=true in URL', () => {
    render(
      <MemoryRouter initialEntries={['/donate?cancelled=true']}>
        <Donate />
      </MemoryRouter>
    );

    expect(screen.getByText(/not completed/)).toBeInTheDocument();
  });
});
