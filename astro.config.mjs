// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

import tailwindcss from '@tailwindcss/vite';
// astro.config runs before astro loads .env into import.meta.env, so the file
// has to be read here the way vite would
import { loadEnv } from 'vite';

const { PUBLIC_SITE_URL } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  '',
);

// @astrojs/sitemap needs a real origin, and canonical/hreflang are built from
// the same value, so a missing one is worth saying out loud at build time
const SITE = PUBLIC_SITE_URL || 'http://localhost:4321';
if (!PUBLIC_SITE_URL) {
  console.warn(
    '[seo] PUBLIC_SITE_URL is unset: canonical, hreflang and sitemap will point at localhost',
  );
}

// https://astro.build/config
export default defineConfig({
  site: SITE,

  // typed and validated env, read in code through src/utils/env.ts
  env: {
    schema: {
      PUBLIC_SITE_URL: envField.string({
        context: 'client',
        access: 'public',
        url: true,
        default: 'http://localhost:4321',
      }),
    },
  },

  // every route is served at /path/, so canonical, sitemap and internal links
  // all agree instead of pointing at a redirect
  trailingSlash: 'always',
  build: { format: 'directory' },

  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'pt',
        locales: { pt: 'pt-BR', en: 'en', es: 'es' },
      },
      // / is the noindex redirect to /pt/ and /100/ a copy of /pt/ for lighthouse runs
      filter: (page) => !['/', '/100/'].includes(new URL(page).pathname),
    }),
    robotsTxt(),
  ],

  // every language carries its prefix, including the default one; / is only a
  // redirect to /pt
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en', 'es'],
    // the generated redirect waits 2s before moving; src/pages/index.astro does
    // it instantly instead
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Raleway',
      cssVariable: '--font-raleway',
      weights: ['100 900'],
      styles: ['normal'],
      fallbacks: ['Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'DM Serif Display',
      cssVariable: '--font-dm-serif',
      weights: ['400'],
      styles: ['normal'],
      fallbacks: ['Georgia', 'serif'],
    },
    // remocn code/terminal blocks read --font-geist-mono
    {
      provider: fontProviders.google(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      weights: ['400', '500'],
      styles: ['normal'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});
