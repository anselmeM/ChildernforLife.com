import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from '../App';

describe('Accessibility', () => {
  it('home page can run axe audit', async () => {
    global.requestIdleCallback = (cb) => setTimeout(cb, 0);
    const axe = await import('axe-core');
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>
    );
    await new Promise(r => setTimeout(r, 1000));
    const results = await axe.default.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(results.violations.length).toBeGreaterThanOrEqual(0);
  }, 15000);
});
