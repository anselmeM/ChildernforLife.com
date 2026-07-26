import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Children for Life';
const BASE_URL = 'https://childrenforlife.com';
const DEFAULT_IMAGE = `${BASE_URL}/favicon.svg`;

export default function PageSEO({ title, description, path, image }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Every Child Deserves a Future`;
  const desc = description || 'Children for Life protects, educates, and empowers vulnerable children in Benin, Cameroon, DR Congo, Ethiopia, Nigeria, and Tanzania. Donate or volunteer today.';
  const url = path ? `${BASE_URL}${path}` : BASE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image || DEFAULT_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image || DEFAULT_IMAGE} />
    </Helmet>
  );
}
