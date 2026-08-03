import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import News from '../pages/misc/News';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

function cmsResponse() {
  return {
    items: [
      {
        sys: { id: 'entry1' },
        fields: {
          title: 'CMS Headline Story',
          slug: 'cms-headline-story',
          tag: 'CMS',
          date: '2026-07-01T00:00:00.000Z',
          excerpt: 'Published from the Contentful dashboard.',
          body: 'First paragraph from the CMS.\n\nSecond paragraph from the CMS.',
          image: { sys: { type: 'Link', linkType: 'Asset', id: 'asset1' } },
        },
      },
    ],
    includes: {
      Asset: [{ sys: { id: 'asset1' }, fields: { file: { url: '//images.ctfassets.net/testspace/img.png' } } }],
    },
  };
}

describe('Contentful CMS integration', () => {
  it('renders CMS content on the news page when Contentful is configured', async () => {
    vi.stubEnv('VITE_CONTENTFUL_SPACE_ID', 'test-space');
    vi.stubEnv('VITE_CONTENTFUL_DELIVERY_TOKEN', 'test-token');
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => cmsResponse(),
    });

    render(
      <MemoryRouter>
        <News />
      </MemoryRouter>
    );

    expect(await screen.findByText('CMS Headline Story')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://cdn.contentful.com/spaces/test-space/environments/master/entries'),
    );
  });

  it('keeps local data when Contentful is not configured', async () => {
    vi.stubEnv('VITE_CONTENTFUL_SPACE_ID', '');
    vi.stubEnv('VITE_CONTENTFUL_DELIVERY_TOKEN', '');
    global.fetch = vi.fn();

    render(
      <MemoryRouter>
        <News />
      </MemoryRouter>
    );

    expect(await screen.findByText('Communiqué: Update on Tanzania Programs')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('falls back to local data when the Contentful request fails', async () => {
    vi.stubEnv('VITE_CONTENTFUL_SPACE_ID', 'test-space');
    vi.stubEnv('VITE_CONTENTFUL_DELIVERY_TOKEN', 'test-token');
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: false, status: 500 });

    render(
      <MemoryRouter>
        <News />
      </MemoryRouter>
    );

    expect(await screen.findByText('Communiqué: Update on Tanzania Programs')).toBeInTheDocument();
  });
});
