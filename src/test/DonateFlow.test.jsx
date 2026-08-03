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

  it('shows campaign banner and sends campaign slug when ?campaign= is set', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ url: 'https://checkout.stripe.com/test' }),
    });

    render(
      <MemoryRouter initialEntries={['/donate?campaign=clean-water-schools']}>
        <Donate />
      </MemoryRouter>
    );

    expect(screen.getByText(/Supporting campaign/)).toBeInTheDocument();
    expect(screen.getByText(/Clean Water for Schools/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Confirm Gift/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/create-checkout-session',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('"campaign":"clean-water-schools"'),
        }),
      );
    });
  });

  it('renders the employer matching gift form', () => {
    render(
      <MemoryRouter>
        <Donate />
      </MemoryRouter>
    );

    expect(screen.getByText(/Employer Matching Gift/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Request a Match/i })).toBeInTheDocument();
  });

  it('charges USD matching the tier label (TZS ÷ 2500)', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ url: 'https://checkout.stripe.com/test' }),
    });

    render(
      <MemoryRouter>
        <Donate />
      </MemoryRouter>
    );

    // Starter Support = TZS 250,000 → ~US$100 = 10000 cents
    fireEvent.click(screen.getByText('Starter Support'));
    fireEvent.click(screen.getByRole('button', { name: /Confirm Gift/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/create-checkout-session',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('"amount":10000'),
        }),
      );
    });
  });

  it('prefills the custom amount from the monthly page state', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ url: 'https://checkout.stripe.com/test' }),
    });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/donate', state: { amountUsd: 35, frequency: 'monthly' } }]}>
        <Donate />
      </MemoryRouter>
    );

    // $35 → TZS 87,500 → 3500 cents
    expect(screen.getByLabelText('Or enter custom TZS amount')).toHaveValue(87500);

    fireEvent.click(screen.getByRole('button', { name: /Confirm Gift/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/create-checkout-session',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('"amount":3500'),
        }),
      );
    });
  });

  it('shows a tribute banner and sends tribute details with the gift', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ url: 'https://checkout.stripe.com/test' }),
    });

    render(
      <MemoryRouter
        initialEntries={[{
          pathname: '/donate',
          state: { tribute: { honoree: 'Grandma Ruth', recipientName: 'Mom', recipientEmail: 'mom@example.com' } },
        }]}
      >
        <Donate />
      </MemoryRouter>
    );

    expect(screen.getByText('In honor of Grandma Ruth')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Confirm Gift/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/create-checkout-session',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('"honoree":"Grandma Ruth"'),
        }),
      );
    });
  });
});
