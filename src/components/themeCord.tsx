import { PullCord } from 'pullcord';
import 'pullcord/pullcord.css';
import { useEffect, useState } from 'react';
import type { NavCopy } from '@/i18n';

const isDark = () => document.documentElement.classList.contains('dark');

const ThemeCord = ({ copy }: { copy: NavCopy }) => {
  // the inline script in layout.astro already picked the theme before paint;
  // read it after mount so the server render stays deterministic
  const [dark, setDark] = useState(false);
  // the cord falls with the hero's second beat, not on its own clock
  const [dropped, setDropped] = useState(false);

  useEffect(() => setDark(isDark()), []);

  useEffect(() => {
    if (document.documentElement.dataset.heroStage === '2') {
      setDropped(true);
      return;
    }
    const drop = () => setDropped(true);
    addEventListener('hero:stage2', drop, { once: true });
    return () => removeEventListener('hero:stage2', drop);
  }, []);

  if (!dropped) return null;

  const flip = () => {
    // the MutationObserver in layout.astro persists this to localStorage
    document.documentElement.classList.toggle('dark');
    setDark(isDark());
  };

  const pull = () => {
    if (!('startViewTransition' in document) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return flip();
    }
    // the new theme spreads out from the knob, like light from the lamp switch
    const knob = document.querySelector('.pullcord-knob')!.getBoundingClientRect();
    const x = knob.left + knob.width / 2;
    const y = knob.top + knob.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(flip).ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`],
          // skiper26's blur option: the new theme comes into focus as it spreads
          filter: ['blur(8px)', 'blur(4px)', 'blur(0px)'],
        },
        { duration: 1200, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    });
  };

  return (
    <PullCord
      onPull={pull}
      // the cord reads like a lamp switch: pulled = light on
      pulled={!dark}
      ariaLabel={copy.theme.toggle}
      className={
        // below lg the hero's right edge belongs to its nav — the menu button
        // on a phone, the links on a tablet — so the cord hangs on the left
        // gutter there instead; z-30 is above the hero content and its nav,
        // below the sticky pill and the menu
        '[--pullcord-right:calc(100%-7rem)] lg:[--pullcord-right:7rem] [--pullcord-z:30] [--pullcord-ink:var(--color-muted-foreground)]'
      }
    />
  );
};

export default ThemeCord;
