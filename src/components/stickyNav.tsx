import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import GlassSurface from '@/components/ui/glass-surface';
import StaggeredMenu from '@/components/ui/staggered-menu';
// from @/i18n/langs, not @/i18n: this island is client:load and the barrel
// pulls in every locale file
import { hrefFor, langs, type Lang } from '@/i18n/langs';
import type { NavCopy } from '@/i18n';

// shared by both layers so they move as one; no fade, it just drops in
const GEOMETRY =
  'fixed top-4 md:top-6 inset-x-6 mx-auto md:w-1/2 transition-transform duration-700 ease-[cubic-bezier(0.33,1.15,0.5,1)]';

const StickyNav = ({ lang, copy }: { lang: Lang; copy: NavCopy }) => {
  const [shown, setShown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // lenis scrolls the window itself, so the native event still fires
    const onScroll = () => setShown(scrollY > innerHeight * 0.5);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  // the hero's own button opens this menu, and it fires before the pill has
  // scrolled into view
  useEffect(() => {
    const open = () => setMenuOpen(true);
    addEventListener('nav:menu', open);
    return () => removeEventListener('nav:menu', open);
  }, []);

  // the pill carries the only close button, so it has to stay out while the
  // menu is open even if the scroll says otherwise
  const visible = shown || menuOpen;
  const LAYER = `${GEOMETRY} ${visible ? 'translate-y-0' : 'translate-y-[-250%]'}`;

  const items = Object.values(copy.links).map(({ href, label, ariaLabel }) => ({
    label,
    ariaLabel,
    link: href,
  }));

  return (
    <>
      {/* the menu paints its own full-screen overlay; the pill sits above it so
          its button is also what closes the menu again */}
      <StaggeredMenu
        isFixed
        open={menuOpen}
        showHeader={false}
        closeOnClickAway={false}
        position='right'
        items={items}
        socialItems={Object.values(copy.social)}
        socialsLabel={copy.socials}
        colors={['#eba8ff', '#7300ff']}
        accentColor='#7300ff'
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
      >
        {/* switching language is a navigation, not client state, so these are
            plain links to the same page under another prefix */}
        <nav aria-label={copy.language.label} className='flex flex-col gap-2'>
          <h3 className='m-0 text-base font-medium [color:var(--sm-accent)]'>
            {copy.language.label}
          </h3>
          <ul role='list' className='m-0 flex list-none flex-row gap-4 p-0'>
            {langs.map((l) => (
              <li key={l}>
                <a
                  href={hrefFor(l)}
                  hrefLang={l}
                  aria-current={l === lang ? 'true' : undefined}
                  className='text-lg font-medium text-[#111] no-underline transition-colors hover:[color:var(--sm-accent)] aria-[current]:[color:var(--sm-accent)]'
                >
                  {copy.language[l]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </StaggeredMenu>

      {/* two layers on purpose. mix-blend-mode anywhere inside the glass's
          parent turns that parent into a backdrop root, and the glass then has
          nothing behind it left to filter. Keeping the blended bar in its own
          fixed layer leaves both rooted at the page. */}
      <div className={`${LAYER} z-40`} aria-hidden inert>
        <GlassSurface width='100%' height={56} borderRadius={999} />
      </div>

      <div
        className={`${LAYER} z-50 mix-blend-difference`}
        // the bar is inert while it sits above the viewport
        aria-hidden={!visible}
        inert={!visible}
      >
        <nav className='flex h-14 items-center justify-between gap-4 px-5 text-white'>
          <a href='#top' aria-label={copy.menu.home} className='font-title text-2xl md:text-3xl'>
            JC
          </a>
          <button
            type='button'
            aria-label={menuOpen ? copy.menu.close : copy.menu.open}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className='grid size-9 place-items-center rounded-full transition-colors hover:bg-white/20'
          >
            {menuOpen ? <X className='size-5' /> : <Menu className='size-5' />}
          </button>
        </nav>
      </div>
    </>
  );
};

export default StickyNav;
