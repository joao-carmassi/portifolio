// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

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
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});
