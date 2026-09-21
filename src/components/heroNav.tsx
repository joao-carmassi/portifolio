import { Menu } from 'lucide-react';
import type { NavCopy } from '@/i18n';
import { hrefFor, langs, type Lang } from '@/i18n/langs';

// lives inside the hero section, so it scrolls away with it and inherits the
// hero's GSAP scope; the padding repeats the hero's own so the links end on
// the same edge as the frame
const HeroNav = ({
  lang,
  copy,
  intro,
}: {
  lang: Lang;
  copy: NavCopy;
  intro: boolean;
}) => (
  <div
    className={`hero-nav ${intro ? 'invisible' : ''} absolute inset-x-0 top-0 z-20 p-6 md:p-12 lg:p-24`}
  >
    <nav className='hero-entry flex flex-col items-end gap-4'>
      <ul className='hidden md:flex items-center gap-6 font-semibold'>
        {Object.values(copy.links).map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className='text-foreground/70 hover:text-foreground transition-colors'
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      {/* same page under another prefix, so plain links */}
      <ul
        aria-label={copy.language.label}
        className='hidden md:flex items-center gap-6 text-sm font-semibold uppercase'
      >
        {langs.map((l) => (
          <li key={l}>
            <a
              href={hrefFor(l)}
              hrefLang={l}
              aria-label={copy.language[l]}
              aria-current={l === lang ? 'true' : undefined}
              className='text-foreground/50 hover:text-foreground aria-[current]:text-foreground transition-colors'
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
      {/* no room for the links on a phone: this opens the same staggered menu
          the sticky pill does, which lives in its own island */}
      <button
        type='button'
        aria-label={copy.menu.open}
        onClick={() => dispatchEvent(new Event('nav:menu'))}
        className='md:hidden grid size-9 place-items-center rounded-full text-foreground/70 hover:text-foreground transition-colors'
      >
        <Menu className='size-6' />
      </button>
    </nav>
  </div>
);

export default HeroNav;
