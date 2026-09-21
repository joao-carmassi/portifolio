// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';

import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
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
    // prisma ui docs, english only, content in src/content/docs/components
    starlight({
      title: 'Prisma UI',
      // lang en-US, not en: the generated astro i18n would claim /en/ as the
      // unprefixed default locale and 404 the portfolio's english page
      locales: { root: { label: 'English', lang: 'en-US' } },
      logo: { src: './src/assets/prisma/logo.svg' },
      // the portfolio has no 404 of its own and starlight's would take over the whole site
      disable404Route: true,
      customCss: ['./src/styles/docs.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/joao-carmassi/prisma-ui' },
      ],
      sidebar: [
        {
          label: 'Getting started',
          items: [
            { label: 'Installation', link: '/components/' },
            { slug: 'components/styles' },
            { slug: 'components/references' },
            { slug: 'components/contributing' },
            { label: 'Component Generator', link: '/components/generator/' },
          ],
        },
        {
          label: 'General',
          items: [
            'components/button',
            'components/badge',
            'components/confetti-wrapper',
            'components/magnetic',
            'components/animated-background',
            'components/tracing-beam',
          ],
        },
        { label: 'Inputs', items: ['components/floating-label-input'] },
        {
          label: 'Cards',
          items: [
            'components/rainbow-card',
            'components/aura-beam-card',
            'components/flip-card',
            'components/tilt-card',
          ],
        },
      ],
    }),
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

  // no astro i18n block: [lang] routes are built by hand, and starlight would
  // otherwise copy those locales and move the english-only docs to /pt/components/
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
