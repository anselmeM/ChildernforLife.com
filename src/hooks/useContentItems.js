import { useEffect, useState } from 'react';
import { fetchCmsItems } from '../lib/content';
import { newsItems } from '../data/news';
import { impactStories } from '../data/impactStories';

const LOCAL_ITEMS = { news: newsItems, stories: impactStories };

// Returns content items for a kind ('news' | 'stories').
// Initial value is the local data so pages render instantly; when Contentful
// is configured, the CMS items replace them after fetch. On any CMS failure we
// keep the local data (silent fallback).
export default function useContentItems(kind) {
  // LOCAL_ITEMS is a module-level map, so its arrays are stable references.
  const [items, setItems] = useState(() => LOCAL_ITEMS[kind] || []);
  const [source, setSource] = useState('local');

  useEffect(() => {
    let cancelled = false;
    const local = LOCAL_ITEMS[kind] || [];

    (async () => {
      try {
        const fallbackImg = local[0]?.img || '';
        const cmsItems = await fetchCmsItems(kind, fallbackImg);
        if (cancelled || cmsItems === null || cmsItems.length === 0) return;
        setItems(cmsItems);
        setSource('cms');
      } catch (error) {
        // Keep local fallback; CMS is optional.
        console.warn(`[content] CMS unavailable for "${kind}", using local data:`, error?.message || error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [kind]);

  return { items, source };
}
