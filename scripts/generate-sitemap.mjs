#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from:
 *  - a static route list (below)
 *  - slugs extracted from src/data/news.js, impactStories.js, campaigns.js
 *  - country keys from src/data/countries.js
 *
 * Run: node scripts/generate-sitemap.mjs
 * (Slugs are read with a regex from the data files so the script stays
 *  runnable without Vite resolving the image imports in those files.)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'public', 'sitemap.xml');
const BASE = 'https://childrenforlife.com';

// [path, priority, changefreq]
const STATIC_ROUTES = [
  ['/', '1.0', 'weekly'],
  ['/donate', '0.9', 'monthly'],
  ['/campaigns', '0.8', 'weekly'],
  ['/news', '0.8', 'weekly'],
  ['/volunteer', '0.8', 'monthly'],
  ['/impact-stories', '0.7', 'monthly'],
  ['/supporters', '0.6', 'monthly'],
  ['/contact', '0.7', 'monthly'],
  ['/regions/where', '0.7', 'monthly'],
  ['/regions/glance', '0.6', 'monthly'],
  ['/donate/monthly', '0.7', 'monthly'],
  ['/partner', '0.6', 'monthly'],
  ['/placements', '0.6', 'monthly'],
  ['/fundraise', '0.6', 'monthly'],
  ['/donate/stocks', '0.6', 'monthly'],
  ['/about/who', '0.7', 'monthly'],
  ['/about/competencies', '0.5', 'monthly'],
  ['/about/team', '0.5', 'monthly'],
  ['/about/board', '0.5', 'monthly'],
  ['/about/leadership', '0.5', 'monthly'],
  ['/about/careers', '0.5', 'monthly'],
  ['/volunteer-faq', '0.5', 'monthly'],
  ['/alumni', '0.5', 'monthly'],
  ['/leave-legacy', '0.5', 'monthly'],
  ['/tribute-gifts', '0.5', 'monthly'],
  ['/programs/volunteering', '0.5', 'monthly'],
  ['/programs/gender', '0.5', 'monthly'],
  ['/programs/economic', '0.5', 'monthly'],
  ['/programs/climate', '0.5', 'monthly'],
  ['/programs/strategic', '0.5', 'monthly'],
  ['/stories/sally', '0.5', 'monthly'],
  ['/publications', '0.5', 'monthly'],
  ['/accountability', '0.5', 'monthly'],
];

const SLUG_SOURCES = [
  ['src/data/news.js', '/news', 'monthly', '0.6'],
  ['src/data/impactStories.js', '/stories', 'monthly', '0.6'],
  ['src/data/campaigns.js', '/campaigns', 'weekly', '0.7'],
];

function extractSlugs(file, pattern) {
  const text = readFileSync(join(root, file), 'utf8');
  return [...text.matchAll(pattern)].map((m) => m[1]);
}

function collectUrls() {
  const urls = STATIC_ROUTES.map(([path, priority, changefreq]) => ({ path, priority, changefreq }));

  for (const [file, prefix, changefreq, priority] of SLUG_SOURCES) {
    for (const slug of extractSlugs(file, /^[ \t]*slug: '([^']+)',$/gm)) {
      urls.push({ path: `${prefix}/${slug}`, priority, changefreq });
    }
  }

  for (const slug of extractSlugs('src/data/countries.js', /^  ([a-z_]+): \{$/gm)) {
    urls.push({ path: `/regions/${slug}`, priority: '0.6', changefreq: 'monthly' });
  }

  // Dedupe by path, keep the first (highest-priority static) entry.
  const seen = new Set();
  return urls.filter((u) => (seen.has(u.path) ? false : (seen.add(u.path), true)));
}

function escapeXml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const urls = collectUrls();
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${BASE}${escapeXml(u.path)}</loc><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`)
  .join('\n')}
</urlset>
`;

writeFileSync(OUT, xml);
console.log(`wrote ${OUT} (${urls.length} URLs)`);

// --- RSS feed -------------------------------------------------------------
// News entries (slug/title/date/excerpt) parsed from src/data/news.js so the
// feed stays in sync with the articles. Entries are 4-space indented blocks.
const RSS_OUT = join(root, 'public', 'rss.xml');
const newsSource = readFileSync(join(root, 'src/data/news.js'), 'utf8');
const entryChunks = newsSource.split(/^    slug: '/m).slice(1);
const newsEntries = entryChunks
  .map((chunk) => {
    const slug = chunk.slice(0, chunk.indexOf("'"));
    const field = (name) => {
      const m = chunk.match(new RegExp(`^    ${name}: '([^']*)'`, 'm'));
      return m ? m[1] : '';
    };
    return { slug, title: field('title'), date: field('date'), excerpt: field('excerpt') };
  })
  .filter((e) => e.slug && e.title);

const rssItems = newsEntries
  .map((entry) => {
    const pubDate = entry.date ? new Date(`${entry.date} UTC`).toUTCString() : '';
    return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${BASE}/news/${escapeXml(entry.slug)}</link>
      <guid>${BASE}/news/${escapeXml(entry.slug)}</guid>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ''}
      ${entry.excerpt ? `<description>${escapeXml(entry.excerpt)}</description>` : ''}
    </item>`;
  })
  .join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Children for Life — News</title>
    <link>${BASE}/news</link>
    <description>Latest news and updates from Children for Life.</description>
    <language>en-us</language>
    <atom:link href="${BASE}/rss.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>
`;

writeFileSync(RSS_OUT, rss);
console.log(`wrote ${RSS_OUT} (${newsEntries.length} items)`);
