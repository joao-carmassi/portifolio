import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Cursor,
  CursorContainer,
  CursorFollow,
  CursorProvider,
} from '@animate-ui/react/primitives/cursor';

/**
 * One cursor for the whole page. Anything can give it a label with
 * `data-cursor="…"`; the closest one under the pointer wins, so it reads
 * .astro markup and every island alike without sharing React context.
 */
const SiteCursor = () => {
  const [fine, setFine] = useState(false);
  const [label, setLabel] = useState('');
  // the hero is dark on a light page: follow the theme of what is under the
  // pointer, not the page's, or the arrow goes black on black
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const query = matchMedia('(pointer: fine)');
    const sync = () => setFine(query.matches);
    sync();
    query.addEventListener('change', sync);

    let target: Element | null = null;
    const read = () => {
      if (!target) return;
      setLabel(target.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? '');
      const inDark = !!target.closest('.dark');
      // data-cursor-theme overrides it where the ground under the pointer is
      // not the theme's: light | dark, or invert for a hover fill in foreground
      const forced = target.closest<HTMLElement>('[data-cursor-theme]')
        ?.dataset.cursorTheme;
      setDark(
        forced === 'dark' ||
          (forced === 'invert' && !inDark) ||
          (forced !== 'light' && forced !== 'invert' && inDark),
      );
    };
    const over = (e: PointerEvent) => {
      target = e.target as Element;
      read();
    };
    // a click can swap the label under a still pointer (the menu button turns
    // into close): read again once React has rendered it
    const click = () => requestAnimationFrame(read);
    document.addEventListener('pointerover', over, { passive: true });
    document.addEventListener('click', click, { passive: true });
    return () => {
      query.removeEventListener('change', sync);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('click', click);
    };
  }, []);

  // touch has no hover, and the native pointer stays on a tablet with a mouse off
  if (!fine) return null;

  return (
    <CursorProvider global>
      <CursorContainer className={dark ? 'dark' : undefined}>
        <Cursor>
          <svg
            className='size-6 text-foreground'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 40 40'
            aria-hidden
          >
            <path
              fill='currentColor'
              className='stroke-background'
              strokeWidth={2}
              d='M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z'
            />
          </svg>
        </Cursor>
        <CursorFollow side='bottom' sideOffset={15} align='end' alignOffset={5}>
          <AnimatePresence mode='popLayout'>
            {label && (
              <motion.div
                key={label}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 550, damping: 30 }}
                className='origin-top-left whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-sm text-background'
              >
                {label}
              </motion.div>
            )}
          </AnimatePresence>
        </CursorFollow>
      </CursorContainer>
    </CursorProvider>
  );
};

export default SiteCursor;
