import type { MetadataRoute } from 'next';
import { routing } from '../../i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

  const locales = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 1,
  }));

  return [...locales];
}
