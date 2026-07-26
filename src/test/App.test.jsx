import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from '../App';

describe('App', () => {
  it('renders the Navbar on the home page', () => {
    render(
      <HelmetProvider><MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter></HelmetProvider>
    );
    expect(screen.getByText('Children')).toBeInTheDocument();
    expect(screen.getByText('for Life')).toBeInTheDocument();
  });

  it('renders the Footer on the home page', async () => {
    render(
      <HelmetProvider><MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter></HelmetProvider>
    );
    expect(await screen.findByText(/Donate Now/i)).toBeInTheDocument();
  });

  it('routes to the /donate path', async () => {
    render(
      <HelmetProvider><MemoryRouter initialEntries={['/donate']}>
        <AppRoutes />
      </MemoryRouter></HelmetProvider>
    );
    await screen.findByText(/Choose Your Impact Path/);
  });

  it('renders the news page at /news', async () => {
    render(
      <HelmetProvider><MemoryRouter initialEntries={['/news']}>
        <AppRoutes />
      </MemoryRouter></HelmetProvider>
    );
    expect(await screen.findByText('LATEST NEWS')).toBeInTheDocument();
  });
});
