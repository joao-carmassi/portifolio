// Renders public/og-image-{lang}.jpg, one per language, so a link shared from
// /en/ previews in english. Headless Edge draws the card (it has the Google
// Fonts the hero uses), sharp turns the screenshot into a small jpeg.
//   node scripts/og-image.mjs
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const BROWSER =
  process.env.BROWSER ??
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

const ROLE = { pt: 'desenvolvedor', en: 'developer', es: 'desarrollador' };
const STACK = 'Next.js · TypeScript · Tailwind · React · Astro · GSAP';

const html = (role) => `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Raleway:wght@500&display=block" rel="stylesheet">
<style>
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #000; }
  .bg {
    position: absolute; inset: -80px; filter: blur(60px);
    background:
      radial-gradient(45% 60% at 0% 100%, #000 30%, transparent 100%),
      radial-gradient(38% 45% at 8% 5%, #00bfff 0%, transparent 100%),
      radial-gradient(35% 40% at 42% 18%, #eba8ff 0%, transparent 100%),
      radial-gradient(45% 55% at 75% 30%, #7300ff 0%, transparent 100%),
      radial-gradient(40% 50% at 95% 90%, #2b00ff 0%, transparent 100%),
      radial-gradient(50% 45% at 60% 75%, #2a0080 0%, transparent 100%);
  }
  .grain { position: absolute; inset: 0; opacity: .35; mix-blend-mode: overlay; }
  .card { position: absolute; left: 72px; bottom: 72px; color: #fff; }
  h1 { font: 700 104px/0.98 'DM Serif Display', serif; margin: 0 0 30px; letter-spacing: -1px; }
  p { font: 500 30px 'Raleway', sans-serif; margin: 0; opacity: .9; }
</style></head><body>
<div class="bg"></div>
<svg class="grain" width="1200" height="630"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>
<div class="card"><h1>João Vitor<br>Carmassi,<br>${role}</h1><p>${STACK}</p></div>
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'og-'));
for (const [lang, role] of Object.entries(ROLE)) {
  const page = join(dir, `${lang}.html`);
  const shot = join(dir, `${lang}.png`);
  writeFileSync(page, html(role));
  execFileSync(BROWSER, [
    '--headless=new',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    '--virtual-time-budget=5000',
    `--screenshot=${shot}`,
    pathToFileURL(page).href,
  ]);
  await sharp(shot)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`public/og-image-${lang}.jpg`);
  console.log(`public/og-image-${lang}.jpg`);
}
