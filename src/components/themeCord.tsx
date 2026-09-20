import { PullCord } from 'pullcord';
import 'pullcord/pullcord.css';
import { useEffect, useState } from 'react';

const isDark = () => document.documentElement.classList.contains('dark');

const ThemeCord = () => {
  // the inline script in layout.astro already picked the theme before paint;
  // read it after mount so the server render stays deterministic
  const [dark, setDark] = useState(false);

  useEffect(() => setDark(isDark()), []);

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
      ariaLabel='Alternar entre tema claro e escuro'
      // above the hero content and its nav, below the sticky pill and the menu
      className='[--pullcord-z:30] [--pullcord-ink:var(--color-muted-foreground)]'
    />
  );
};

export default ThemeCord;
