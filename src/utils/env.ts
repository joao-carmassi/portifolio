/**
 * The deployed origin. Unset it and everything SEO points at localhost, so
 * astro.config warns at build time rather than letting a wrong canonical ship.
 */
export const getBasePath = (): string =>
  import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321';

/**
 * Absolute URL that matches exactly what the server answers with.
 *
 * The site builds with Astro's `directory` format, so every route is served at
 * `/path/` and `/path` answers with a redirect. A canonical pointing at the
 * slash-less form therefore points at a redirect, which splits the indexing
 * signal across two URLs. Always emit the trailing slash so canonical, sitemap
 * and served URL agree.
 */
export const getCanonicalUrl = (path = '/'): string => {
  const base = getBasePath().replace(/\/+$/, '');
  const normalized = `/${path.replace(/^\/+/, '').replace(/\/+$/, '')}`;
  return normalized === '/' ? `${base}/` : `${base}${normalized}/`;
};
