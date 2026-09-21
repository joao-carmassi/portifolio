import { PUBLIC_SITE_URL } from 'astro:env/client';

/**
 * The deployed origin, without trailing slash. Every env read goes through a
 * getter here, so renaming a variable only touches this file. Unset, it falls
 * back to localhost and astro.config warns at build time.
 */
export const getSiteUrl = (): string => PUBLIC_SITE_URL.replace(/\/+$/, '');

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
  const base = getSiteUrl();
  const normalized = `/${path.replace(/^\/+/, '').replace(/\/+$/, '')}`;
  return normalized === '/' ? `${base}/` : `${base}${normalized}/`;
};
