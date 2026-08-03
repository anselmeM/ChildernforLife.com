import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from '../App';
import VolunteerFAQ from '../pages/actions/VolunteerFAQ';

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
    await screen.findByText(/Choose Your Impact Path/, {}, { timeout: 5000 });
  });

  it('renders the news page at /news', async () => {
    render(
      <HelmetProvider><MemoryRouter initialEntries={['/news']}>
        <AppRoutes />
      </MemoryRouter></HelmetProvider>
    );
    expect(await screen.findByText('LATEST NEWS', {}, { timeout: 5000 })).toBeInTheDocument();
  });

  it('renders a news article at /news/:slug', async () => {
    render(
      <HelmetProvider><MemoryRouter initialEntries={['/news/communique-update-tanzania-programs']}>
        <AppRoutes />
      </MemoryRouter></HelmetProvider>
    );
    expect(await screen.findByText('Communiqué: Update on Tanzania Programs', {}, { timeout: 5000 })).toBeInTheDocument();
  });

  it('renders an impact story at /stories/:slug', async () => {
    render(
      <HelmetProvider><MemoryRouter initialEntries={['/stories/clean-water-morogoro-schools']}>
        <AppRoutes />
      </MemoryRouter></HelmetProvider>
    );
    expect(await screen.findByText('Clean Water for Morogoro Schools', {}, { timeout: 5000 })).toBeInTheDocument();
  });

  it('renders the campaigns listing at /campaigns', async () => {
    render(
      <HelmetProvider><MemoryRouter initialEntries={['/campaigns']}>
        <AppRoutes />
      </MemoryRouter></HelmetProvider>
    );
    expect(await screen.findByText('Solar-Powered Futures', {}, { timeout: 5000 })).toBeInTheDocument();
  });

  it('renders a campaign detail page at /campaigns/:slug', async () => {
    render(
      <HelmetProvider><MemoryRouter initialEntries={['/campaigns/clean-water-schools']}>
        <AppRoutes />
      </MemoryRouter></HelmetProvider>
    );
    expect(await screen.findByText('Clean Water for Schools', {}, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Donate to this campaign/i })).toHaveAttribute('href', '/donate?campaign=clean-water-schools');
  });

  it('emits FAQPage structured data on /volunteer-faq', async () => {
    // Rendered directly (not via the lazy route) to keep this focused on
    // structured-data output rather than chunk-load timing.
    render(
      <HelmetProvider><MemoryRouter initialEntries={['/volunteer-faq']}>
        <VolunteerFAQ />
      </MemoryRouter></HelmetProvider>
    );
    await screen.findByText('Volunteer FAQ');

    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const faqScript = [...scripts].find((s) => s.textContent.includes('"@type":"FAQPage"'));
    expect(faqScript).toBeTruthy();
    expect(faqScript.textContent).toContain('What qualifications do I need to volunteer?');
  });
});
