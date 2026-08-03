import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Children for Life';
const BASE_URL = 'https://childrenforlife.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION =
  'Children for Life protects, educates, and empowers vulnerable children in Benin, Cameroon, DR Congo, Ethiopia, Nigeria, and Tanzania. Donate or volunteer today.';

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'NonprofitOrganization',
  name: SITE_NAME,
  url: BASE_URL,
  logo: DEFAULT_IMAGE,
  description: DEFAULT_DESCRIPTION,
  email: 'info@childrenforlife.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
};

export default function PageSEO({ title, description, path, image, schema }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Every Child Deserves a Future`;
  const desc = description || DEFAULT_DESCRIPTION;
  const url = path ? `${BASE_URL}${path}` : BASE_URL;
  const resolvedImage = image || DEFAULT_IMAGE;

  // Pages may pass extra JSON-LD (array or object); Organization is always included.
  const schemaBlocks = [
    { ...ORGANIZATION_SCHEMA, '@id': `${BASE_URL}/#organization` },
    ...(Array.isArray(schema) ? schema : schema ? [schema] : []),
  ];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={resolvedImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={resolvedImage} />
      {schemaBlocks.map((block, i) => (
        <script key={`jsonld-${i}`} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
