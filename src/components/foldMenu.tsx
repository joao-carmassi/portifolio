import { gsap } from 'gsap';
import { type MouseEvent, useEffect, useRef } from 'react';
import type { NavCopy } from '@/i18n';
import { hrefFor, langs, type Lang } from '@/i18n/langs';

// after morphin.dev's GSAP page fold menu: the page tips back like a card,
// shrinks and drops below the links, which rise in over black. Same timeline
// and numbers as the original (0.7s power3.out, scale 0.92, 8deg tilt on a
// 1600px perspective, links staggered 60ms, closing 1.6x faster). The page
// here is far taller than the screen, so the card is the slice in view: the
// fold pivots on the scroll position and a clip-path cuts the rest away.

const DURATION = 0.7;
const CLOSE_SPEED = 1.6;

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// after morphin.dev's animated menu text: on hover each letter rolls up out of
// its line as a twin rolls in from below, spreading out from the middle (same
// 35ms stagger and 0.3s ease-in-out). Plain CSS, so leaving rolls it back.
const STAGGER = 0.035;

const RollText = ({ text }: { text: string }) => {
  const chars = [...text];
  const mid = (chars.length - 1) / 2;
  const letters = (roll: string) =>
    chars.map((ch, i) => (
      <span
        key={i}
        className={`inline-block transition-transform duration-300 ease-in-out motion-reduce:transition-none ${roll}`}
        style={{ transitionDelay: `${STAGGER * Math.abs(i - mid)}s` }}
      >
        {ch}
      </span>
    ));
  return (
    // the link's aria-label names it; these are the same word twice
    <span aria-hidden className='relative block overflow-hidden whitespace-pre'>
      <span className='block'>
        {letters('group-hover:-translate-y-full group-focus-visible:-translate-y-full')}
      </span>
      <span className='absolute inset-0'>
        {letters('translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0')}
      </span>
    </span>
  );
};

type Fold = {
  tl: gsap.core.Timeline;
  frame: () => void;
  rim: HTMLElement;
  unpin: (() => void)[];
};

const FoldMenu = ({
  open,
  onClose,
  lang,
  copy,
}: {
  open: boolean;
  onClose: () => void;
  lang: Lang;
  copy: NavCopy;
}) => {
  const nav = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const fold = useRef<Fold | null>(null);

  const card = () => document.querySelector<HTMLElement>('[data-fold-card]');

  const unfold = () => {
    if (!fold.current) return;
    gsap.ticker.remove(fold.current.frame);
    fold.current.tl.kill();
    fold.current.rim.remove();
    gsap.set(card(), { clearProps: 'all' });
    fold.current.unpin.forEach((f) => f());
    fold.current = null;
  };

  const build = (page: HTMLElement): Fold => {
    const wide = innerWidth >= 1280;
    const mid = innerWidth >= 768;
    const corner = { r: 0 };
    // a section ScrollTrigger is pinning right now is position: fixed, and
    // under a transformed ancestor fixed means "from the page's top" instead
    // of the screen's: it moves to where it shows until the page unfolds
    const unpin = [...page.querySelectorAll<HTMLElement>('.pin-spacer > *')]
      .filter((el) => getComputedStyle(el).position === 'fixed')
      .map((el) => {
        const top = el.style.top;
        el.style.top = `${el.getBoundingClientRect().top + scrollY - page.offsetTop}px`;
        // unless the scroll since then has ended the pin, and ScrollTrigger
        // has placed it again itself
        return () => {
          if (el.style.position === 'fixed') el.style.top = top;
        };
      });
    // a hairline on the card's edge, so a dark page still reads on the black
    const rim = document.createElement('div');
    rim.setAttribute('aria-hidden', 'true');
    rim.className =
      'pointer-events-none absolute inset-x-0 z-999 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1)]';
    page.append(rim);
    // added after lenis's ticker callback, so it reads the scroll lenis just
    // wrote: a link click scrolls the page while the fold is still opening out
    const frame = () => {
      const top = scrollY - page.offsetTop;
      const bottom = Math.max(0, page.offsetHeight - top - innerHeight);
      page.style.transformOrigin = `50% ${top}px`;
      page.style.clipPath = `inset(${top}px 0 ${bottom}px 0 round ${corner.r}px)`;
      rim.style.cssText = `top:${top}px;height:${innerHeight}px;border-radius:${corner.r}px`;
    };
    const tl = gsap
      .timeline({
        paused: true,
        defaults: { duration: DURATION, ease: 'power3.out' },
        onReverseComplete: unfold,
      })
      .fromTo(
        page,
        { y: 0, scale: 1, rotationX: 0, transformPerspective: 1600 },
        {
          y: nav.current!.getBoundingClientRect().bottom + (wide ? 80 : mid ? 48 : 32),
          scale: 0.92,
          rotationX: 8,
          transformPerspective: 1600,
        },
        0,
      )
      .to(corner, { r: wide ? 48 : mid ? 36 : 24 }, 0)
      .fromTo(
        [canvas.current, nav.current],
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.01, ease: 'none' },
        0,
      )
      // the theme cord hangs from the top edge, right across the links
      .fromTo(
        [...document.querySelectorAll('.pullcord')],
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: DURATION * 0.3 },
        0,
      )
      .fromTo(
        nav.current!.querySelectorAll('li'),
        { autoAlpha: 0, yPercent: 60 },
        { autoAlpha: 1, yPercent: 0, duration: DURATION * 0.7, stagger: 0.06 },
        DURATION * 0.18,
      );
    gsap.ticker.add(frame);
    frame();
    return { tl, frame, rim, unpin };
  };

  useEffect(() => {
    const page = card();
    if (!page) return;
    // clicks and focus skip the folded page; pressing it closes (onPress)
    page.inert = open;
    // reduced motion keeps the same end state and skips the travel
    if (open) {
      fold.current ??= build(page);
      fold.current.tl.timeScale(reduced() ? 100 : 1).play();
    } else {
      fold.current?.tl.timeScale(reduced() ? 100 : CLOSE_SPEED).reverse();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // the page stays put: lenis listens for these on window, so they stop
    // there in the capture phase, before it hears them
    const hold = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    // pointerdown, not click: the click that opened the menu is still on its
    // way up to window when this listener goes on
    const onPress = (e: PointerEvent) =>
      !(e.target as Element).closest('nav') && onClose();
    // the links wrap differently at another width, so the fold is rebuilt
    // where it stands
    const onResize = () => {
      const page = card();
      if (!page || !fold.current) return;
      const at = fold.current.tl.progress();
      unfold();
      fold.current = build(page);
      fold.current.tl.progress(at);
    };
    const opts = { capture: true, passive: false };
    addEventListener('wheel', hold, opts);
    addEventListener('touchmove', hold, opts);
    addEventListener('keydown', onKey);
    addEventListener('pointerdown', onPress);
    addEventListener('resize', onResize);
    return () => {
      removeEventListener('wheel', hold, opts);
      removeEventListener('touchmove', hold, opts);
      removeEventListener('keydown', onKey);
      removeEventListener('pointerdown', onPress);
      removeEventListener('resize', onResize);
    };
  }, [open, onClose]);

  useEffect(() => unfold, []);

  // lenis's own anchor handling would measure the section through the fold
  // (shrunk, tilted, pushed down) and land in the wrong place, so the section
  // is measured flat and lenis gets the number; it scrolls while the page
  // opens back out
  const go = (e: MouseEvent, href: string) => {
    const page = card();
    const to = document.querySelector(href);
    if (page && to) {
      e.preventDefault();
      e.stopPropagation();
      const folded = page.style.transform;
      page.style.transform = 'none';
      const top = to.getBoundingClientRect().top + scrollY;
      page.style.transform = folded;
      dispatchEvent(new CustomEvent('nav:scrollto', { detail: top }));
    }
    onClose();
  };

  return (
    <>
      <div
        ref={canvas}
        aria-hidden
        className='invisible fixed inset-0 -z-10 bg-black opacity-0'
      />
      <nav
        ref={nav}
        id='fold-menu'
        inert={!open}
        className='invisible fixed inset-x-0 top-0 z-30 px-6 pt-24 text-white opacity-0 md:px-12 md:pt-28'
      >
        <ul className='flex flex-wrap justify-center gap-x-6 gap-y-1 md:gap-x-10 xl:gap-x-16'>
          {Object.values(copy.links).map(({ href, label, ariaLabel }) => (
            <li key={href}>
              <a
                href={href}
                aria-label={ariaLabel}
                onClick={(e) => go(e, href)}
                // the rolled word looks the same, so keyboard focus also dims it
                className='group block font-title text-3xl leading-tight transition-colors focus-visible:text-white/45 focus-visible:outline-none md:text-5xl xl:text-6xl'
              >
                <RollText text={label} />
              </a>
            </li>
          ))}
        </ul>
        <div className='mt-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-semibold uppercase tracking-widest md:mt-6 md:text-sm'>
          {/* another language is another page, so plain links */}
          <ul aria-label={copy.language.label} className='flex gap-4'>
            {langs.map((l) => (
              <li key={l}>
                <a
                  href={hrefFor(l)}
                  hrefLang={l}
                  aria-label={copy.language[l]}
                  aria-current={l === lang ? 'true' : undefined}
                  className='text-white/45 transition-colors hover:text-white aria-[current]:text-white'
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <ul aria-label={copy.socials} className='flex gap-4'>
            {Object.values(copy.social).map(({ label, link }) => (
              <li key={link}>
                <a
                  href={link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white/45 transition-colors hover:text-white'
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default FoldMenu;
