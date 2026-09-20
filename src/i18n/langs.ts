// Kept apart from ./index.ts on purpose. index.ts imports all 27 locale files
// and builds the static I18n at module scope, so a client island that reaches
// for `langs` or `hrefFor` through it drags the whole message tree into the
// browser bundle. This module has no imports and no side effects.

export const langs = ['pt', 'en', 'es'] as const;
export type Lang = (typeof langs)[number];

/** pt is the default language and the fallback for any key the others miss. */
export const FALLBACK: Lang = 'pt';

export const isLang = (value: unknown): value is Lang =>
  langs.includes(value as Lang);

/** Same page in another language: pt sits at the root, the rest are prefixed. */
export const hrefFor = (lang: Lang): string =>
  lang === FALLBACK ? '/' : `/${lang}/`;
