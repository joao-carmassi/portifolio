import type { APIRoute } from 'astro';
import { messages } from '@/i18n';
import { hrefFor, langs } from '@/i18n/langs';
import { getSiteUrl, getCanonicalUrl } from '@/utils/env';

// https://llmstxt.org — built from the English locale so it never drifts from
// the page copy
export const GET: APIRoute = () => {
  const m = messages('en');
  const site = getSiteUrl();
  const list = <T>(o: Record<string, T>) => Object.values(o);

  const body = `# João Vitor Carmassi

> ${m.meta.description}

${m.about.intro}

Based in São Bento do Sapucaí, SP, Brazil, working 100% remote. Languages: Portuguese (native), English (C1), Spanish (B2).

## Pages

${langs.map((l) => `- [${m.nav.language[l]}](${getCanonicalUrl(hrefFor(l))})`).join('\n')}

## Projects & Clients

${list(m.clients.items)
  .map((c) => `- ${'url' in c ? `[${c.title}](${c.url})` : c.title}: ${c.longDescription}`)
  .join('\n')}

## Documents

${list(m.docs.resume.dialog.options)
  .map((o) => `- [Resume (${o.label})](${site}${o.link})`)
  .join('\n')}
${list(m.docs.docs)
  .map((d) => `- [${d.title}](${site}${d.link}): ${d.details}`)
  .join('\n')}

## Contact

- Email: joaovitorcarmassi@gmail.com
${list(m.nav.social).map((s) => `- [${s.label}](${s.link})`).join('\n')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
