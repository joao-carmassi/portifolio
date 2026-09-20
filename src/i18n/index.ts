import { createStaticI18n } from '@embra/i18n/astro';
import type { Locale, Locales } from '@embra/i18n';
import { FALLBACK, isLang, type Lang } from '@/i18n/langs';

import ptMeta from '@/locales/pt/meta.json';
import ptNav from '@/locales/pt/nav.json';
import ptHero from '@/locales/pt/hero.json';
import ptAbout from '@/locales/pt/about.json';
import ptDocs from '@/locales/pt/docs.json';
import ptStack from '@/locales/pt/stack.json';
import ptClients from '@/locales/pt/clients.json';
import ptContact from '@/locales/pt/contact.json';
import ptFooter from '@/locales/pt/footer.json';

import enMeta from '@/locales/en/meta.json';
import enNav from '@/locales/en/nav.json';
import enHero from '@/locales/en/hero.json';
import enAbout from '@/locales/en/about.json';
import enDocs from '@/locales/en/docs.json';
import enStack from '@/locales/en/stack.json';
import enClients from '@/locales/en/clients.json';
import enContact from '@/locales/en/contact.json';
import enFooter from '@/locales/en/footer.json';

import esMeta from '@/locales/es/meta.json';
import esNav from '@/locales/es/nav.json';
import esHero from '@/locales/es/hero.json';
import esAbout from '@/locales/es/about.json';
import esDocs from '@/locales/es/docs.json';
import esStack from '@/locales/es/stack.json';
import esClients from '@/locales/es/clients.json';
import esContact from '@/locales/es/contact.json';
import esFooter from '@/locales/es/footer.json';

export { FALLBACK, hrefFor, isLang, langs, type Lang } from '@/i18n/langs';

/** The shape every language has to match, taken from the Portuguese files. */
export type Messages = {
  meta: typeof ptMeta;
  nav: typeof ptNav;
  hero: typeof ptHero;
  about: typeof ptAbout;
  docs: typeof ptDocs;
  stack: typeof ptStack;
  clients: typeof ptClients;
  contact: typeof ptContact;
  footer: typeof ptFooter;
};

const byLang: Record<Lang, Messages> = {
  pt: {
    meta: ptMeta,
    nav: ptNav,
    hero: ptHero,
    about: ptAbout,
    docs: ptDocs,
    stack: ptStack,
    clients: ptClients,
    contact: ptContact,
    footer: ptFooter,
  },
  en: {
    meta: enMeta,
    nav: enNav,
    hero: enHero,
    about: enAbout,
    docs: enDocs,
    stack: enStack,
    clients: enClients,
    contact: enContact,
    footer: enFooter,
  },
  es: {
    meta: esMeta,
    nav: esNav,
    hero: esHero,
    about: esAbout,
    docs: esDocs,
    stack: esStack,
    clients: esClients,
    contact: esContact,
    footer: esFooter,
  },
};

/** The whole message tree for one language, typed against the pt files. */
export const messages = (lang: string | undefined): Messages =>
  byLang[isLang(lang) ? lang : FALLBACK];

// @embra/i18n's Locale type is string-or-nested-object, so lists in the json
// are numbered keys ("0", "1", ...) rather than arrays
export const locales = byLang as unknown as Locales;

export const { getI18n, getT } = createStaticI18n({
  locales,
  fallback: FALLBACK,
});

export type { Locale };

// per-section types for the islands. They are type-only imports there, so the
// Portuguese json never reaches a client bundle.
export type MetaCopy = Messages['meta'];
export type NavCopy = Messages['nav'];
export type HeroCopy = Messages['hero'];
export type AboutCopy = Messages['about'];
export type DocsCopy = Messages['docs'];
export type StackCopy = Messages['stack'];
export type ClientsCopy = Messages['clients'];
export type ContactCopy = Messages['contact'];
export type FooterCopy = Messages['footer'];
