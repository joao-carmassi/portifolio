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

  const pull = () => {
    // the MutationObserver in layout.astro persists this to localStorage
    document.documentElement.classList.toggle('dark');
    setDark(isDark());
  };

  return (
    <PullCord
      onPull={pull}
      // the cord reads like a lamp switch: pulled = light on
      pulled={!dark}
      ariaLabel={copy.theme.toggle}
      className={
        // the phone's right edge belongs to the hero's menu button, so over
        // there the cord hangs on the left gutter instead; z-30 is above the
        // hero content and its nav, below the sticky pill and the menu
        '[--pullcord-right:calc(100%_-_7rem)] md:[--pullcord-right:7rem] [--pullcord-z:30] [--pullcord-ink:var(--color-muted-foreground)]'
      }
    />
  );
};

export default ThemeCord;
