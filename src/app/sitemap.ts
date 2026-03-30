import type { MetadataRoute } from 'next';
import { routing } from '../../i18n/routing';
import getAppBasePath from '@/lib/get-app-base-path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getAppBasePath();

  const locales = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}/`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 1,
  }));

  return [...locales];
}
