import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  // starlight always reads this one for its ui strings. It needs one entry to
  // stop the build warning, hence the empty src/content/i18n/en-US.json
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
