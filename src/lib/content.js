// Contentful integration for news & impact stories.
//
// When VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_DELIVERY_TOKEN are set (see
// .env.example / NEXT-STEPS.md), the listing and detail pages load content from
// Contentful's public Delivery API. The delivery token is read-only and safe to
// ship in the client bundle. When the env vars are missing, pages fall back to
// the local data files (src/data/*) so the site always renders.

const CONTENT_TYPE = {
  news: 'newsPost',
  stories: 'story',
};

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return '';
  }
}

function parseBody(body) {
  if (Array.isArray(body)) return body.filter((p) => typeof p === 'string' && p.trim());
  if (typeof body === 'string') return body.split(/\n{2,}/).filter((p) => p.trim());
  return [];
}

// Loads entries for a content type and maps them to the shape the pages use
// ({slug, title, tag, date, img, imgCard, excerpt, body}).
export async function fetchCmsItems(kind, fallbackImg = '') {
  const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const token = import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN;

  if (!spaceId || !token) {
    return null; // not configured — caller falls back to local data
  }

  const order = kind === 'news' ? '&order=-fields.date' : '';
  const url =
    `https://cdn.contentful.com/spaces/${encodeURIComponent(spaceId)}/environments/master/entries` +
    `?access_token=${encodeURIComponent(token)}` +
    `&content_type=${CONTENT_TYPE[kind]}` +
    `${order}&limit=50`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Contentful request failed (${res.status})`);
  }

  const data = await res.json();
  const assets = new Map(
    (data.includes?.Asset || []).map((asset) => [asset.sys.id, asset.fields?.file?.url || '']),
  );

  // Hardening for CMS-controlled values: slugs are constrained to URL-safe
  // kebab-case, and images must come from Contentful's own CDN hosts.
  const ctfImage = (url) => (/^\/\/(images|assets)\.ctfassets\.net\//.test(url) ? url : '');

  return (data.items || []).map((entry) => {
    const f = entry.fields || {};
    const rawImg = f.image ? assets.get(f.image.sys.id) : '';
    // Contentful's image CDN can reformat/resize on the fly.
    const img = rawImg && ctfImage(rawImg) ? `${rawImg}?fm=webp&q=75&w=1200` : fallbackImg;
    return {
      slug: String(f.slug || '').replace(/[^a-z0-9-]/gi, '-').replace(/-+/g, '-').toLowerCase(),
      title: String(f.title || 'Untitled'),
      tag: String(f.tag || 'News'),
      date: formatDate(f.date),
      img,
      imgCard: rawImg && ctfImage(rawImg) ? `${rawImg}?fm=webp&q=70&w=640` : undefined,
      excerpt: String(f.excerpt || ''),
      body: parseBody(f.body),
    };
  });
}
