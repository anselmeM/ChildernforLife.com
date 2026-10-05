import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from '../App';

// Every route the app serves, plus the 404 shell. Auditing all of them is what
// makes the heading hierarchy a gate rather than a spot check.
const ROUTES = [
  '/',
  '/donate',
  '/donate/monthly',
  '/donate/stocks',
  '/donate/success?session_id=cs_test_a1b2c3d4e5',
  '/campaigns',
  '/campaigns/clean-water-schools',
  '/supporters',
  '/placements',
  '/volunteer',
  '/volunteer-faq',
  '/alumni',
  '/fundraise',
  '/leave-legacy',
  '/tribute-gifts',
  '/partner',
  '/contact',
  '/programs/volunteering',
  '/programs/gender',
  '/programs/economic',
  '/programs/climate',
  '/programs/strategic',
  '/about/who',
  '/about/competencies',
  '/about/team',
  '/about/board',
  '/about/careers',
  '/impact-stories',
  '/stories/sallys-story-lighting-futures',
  '/news',
  '/news/communique-update-tanzania-programs',
  '/publications',
  '/accountability',
  '/regions/glance',
  '/regions/where',
  '/regions/tanzania',
  '/this-route-does-not-exist',
];

function formatViolations(violations) {
  return violations
    .map(
      (violation) =>
        `\n  [${violation.impact}] ${violation.id} — ${violation.help}\n` +
        violation.nodes.map((node) => `      ${node.target.join(' ')}`).join('\n'),
    )
    .join('');
}

beforeEach(() => {
  // Some pages fire best-effort requests on mount; the audit does not care
  // whether they resolve, only that nothing rejects noisily.
  global.fetch = vi.fn(() => new Promise(() => {}));
});

describe('Accessibility (axe)', () => {
  // The previous version asserted `results.violations.length >= 0`, which is
  // true for every possible result — the suite could never fail. These audit
  // real routes and fail on any violation.
  it.each(ROUTES)('%s has no axe violations', async (route) => {
    const axe = await import('axe-core');

    const { container, unmount } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[route]}>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>,
    );

    // Wait for the lazy route to replace its spinner.
    await waitFor(
      () => {
        expect(container.querySelector('.animate-spin')).toBeNull();
        expect(container.querySelector('main')?.childElementCount ?? 0).toBeGreaterThan(0);
      },
      { timeout: 15000 },
    );

    const results = await axe.default.run(document.body, {
      // jsdom has no layout or paint, so axe cannot compute contrast ratios;
      // that rule needs a real browser.
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(formatViolations(results.violations)).toBe('');

    unmount();
  }, 30000);
});
