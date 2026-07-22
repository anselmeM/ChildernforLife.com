import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../App';

describe('App', () => {
  it('renders the Navbar on the home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText('Children')).toBeInTheDocument();
    expect(screen.getByText('for Life')).toBeInTheDocument();
  });

  it('renders the Footer on the home page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Donate Now/)).toBeInTheDocument();
  });

  it('renders the donate page at /donate', async () => {
    render(
      <MemoryRouter initialEntries={['/donate']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(await screen.findByText('Listen First, Act Next')).toBeInTheDocument();
  });

  it('renders the news page at /news', async () => {
    render(
      <MemoryRouter initialEntries={['/news']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(await screen.findByText('LATEST NEWS')).toBeInTheDocument();
  });
});
