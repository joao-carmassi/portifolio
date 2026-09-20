import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

const StickyNav = () => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // lenis scrolls the window itself, so the native event still fires
    const onScroll = () => setShown(scrollY > innerHeight * 0.5);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      // no fade: it drops in from past the top edge and settles, nothing else
      className={`fixed top-4 md:top-6 inset-x-6 md:inset-x-12 lg:inset-x-24 z-50 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        shown ? 'translate-y-0' : '-translate-y-[250%]'
      }`}
      // the bar is inert while it sits above the viewport
      aria-hidden={!shown}
      inert={!shown}
    >
      {/* the pill sits over both white and grey sections, so the border and the
          shadow carry the shape; the fill only tints what shows through */}
      <nav className='flex items-center justify-between gap-4 rounded-full border border-border bg-card/80 px-5 py-2.5 shadow-lg shadow-foreground/5 supports-backdrop-filter:bg-card/55 supports-backdrop-filter:backdrop-blur-xl'>
        <a href='#heroHomepage' className='font-title text-2xl md:text-3xl'>
          JC
        </a>
        <button
          type='button'
          aria-label='Abrir menu'
          className='grid size-9 place-items-center rounded-full transition-colors hover:bg-foreground/10'
        >
          <Menu className='size-5' />
        </button>
      </nav>
    </div>
  );
};

export default StickyNav;
