import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nProvider } from '../i18n/provider';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';

afterEach(() => {
  localStorage.clear();
});

describe('i18n', () => {
  it('defaults to English and switches the navbar to French', async () => {
    const user = userEvent.setup();
    render(
      <HelmetProvider>
        <I18nProvider>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </I18nProvider>
      </HelmetProvider>
    );

    expect(screen.getAllByText('Donate').length).toBeGreaterThan(0);

    // Open the language dropdown, then pick Français.
    await user.click(screen.getByRole('button', { name: /Language/i }));
    await user.click(screen.getByRole('menuitem', { name: 'Français' }));

    expect(screen.getAllByText('Faire un don').length).toBeGreaterThan(0);
    expect(screen.queryByText('Donate')).not.toBeInTheDocument();
  });

  it('persists the choice and translates the homepage heading', async () => {
    const user = userEvent.setup();
    render(
      <HelmetProvider>
        <I18nProvider>
          <MemoryRouter>
            <Navbar />
            <Home />
          </MemoryRouter>
        </I18nProvider>
      </HelmetProvider>
    );

    expect(screen.getByText('Every Child Deserves a Future')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Language/i }));
    await user.click(screen.getByRole('menuitem', { name: 'Kiswahili' }));

    expect(screen.getByText('Kila Mtoto Anastahili Maisha Bora')).toBeInTheDocument();
    expect(localStorage.getItem('cfl-language')).toBe('sw');
  });
});
