import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import type { ClientsCopy } from '@/i18n';
import { Picture } from '@/components/ui/picture';
import type { OptimizedImage } from '@/lib/images';

// after morphin.dev's GSAP 3D bending image carousel: an endless strip of thin
// slices that bows towards the camera and tilts at its ends the faster it
// moves, colouring the slices it sweeps through. A slice opens into the
// project, its neighbours squeezed to the sides, with the title rising over
// the top of the image. Same layout numbers, easing and per-frame maths as the
// original; on a scrolling page the wheel isn't taken over, so the page scroll
// itself pushes the strip along.

/** one entry of copy.items — every member of that union fits this shape */
type ClientItem = {
  title: string;
  description: string;
  /** absent when the project is no longer online */
  url?: string;
  image: string;
  longDescription: string;
  cursor: string;
};

// each project's ground and ink, picked from its own site: the stage takes
// them on while the project is open, as the original's page does
const themes: Record<string, { bg: string; fg: string }> = {
  '/clients/refugio.webp': { bg: '#221c14', fg: '#f39e1f' },
  '/clients/qf.webp': { bg: '#f2f1ef', fg: '#e9010c' },
  '/clients/higgx.webp': { bg: '#f6f1e8', fg: '#d9590b' },
  '/clients/grao.webp': { bg: '#f5efe1', fg: '#790d16' },
  '/clients/mapa.webp': { bg: '#d9ebd5', fg: '#2e6c50' },
  '/clients/prisma.webp': { bg: '#070609', fg: '#c37ff7' },
  '/clients/jean.webp': { bg: '#fffceb', fg: '#8c6937' },
  '/clients/vrf.webp': { bg: '#010a6a', fg: '#8fd0ff' },
};

const getHost = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

// the original's sizes, from the stage's width and height
const layoutFor = (vw: number, vh: number) => {
  if (vw < 768) {
    const w = vw * 0.8;
    return {
      vw,
      vh,
      slice: { w: vw * 0.12, h: Math.min(vh * 0.42, vw * 0.46), gap: vw * 0.035 },
      open: { w, h: w * 0.56, sideW: vw * 0.3, gap: vw * 0.06 },
      title: { w: vw * 0.86, size: vw * 0.15, offset: vw * 0.12 },
      perspective: vw * 1.6,
      depth: vw * 0.22,
      tilt: 24,
    };
  }
  const f = Math.min(vw, vh * 1.6);
  return {
    vw,
    vh,
    slice: { w: f * 0.054, h: f * 0.2, gap: f * 0.014 },
    // a touch shorter than the original's 0.315, to leave room for the text
    open: { w: f * 0.55, h: f * 0.29, sideW: f * 0.13, gap: f * 0.095 },
    title: { w: f * 0.7, size: f * 0.13, offset: f * 0.05 },
    perspective: f * 1.1,
    depth: f * 0.22,
    tilt: 32,
  };
};
type Layout = ReturnType<typeof layoutFor>;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const mod = (v: number, n: number) => ((v % n) + n) % n;
/** the shortest way round the loop from one slice to another */
const wrapDelta = (v: number, n: number) => mod(v + n / 2, n) - n / 2;
/** a per-frame lerp factor that holds at any frame rate */
const damp = (t: number, frames: number) => 1 - Math.pow(1 - t, frames);

const DRAG_THRESHOLD = 6;
const DRAG_SPEED = 1.6;
const FLING = 14;
/** page scroll the strip has to see before an open project closes */
const CLOSE_ON_SCROLL = 80;

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

type Frame = {
  current: number;
  previous: number;
  target: number;
  bend: number;
  boost: number;
  open: number;
  active: number | null;
  /** the open place, between two slices while it steps to the next one */
  focus: number;
  hovered: number;
  hover: number[];
};

/** shared with the ticks above the strip */
type Pulse = { position: number; speed: number };

// two lines at most, split where they come out closest in length
const titleLines = (title: string): string[] => {
  const words = title.split(' ');
  if (title.length <= 12 || words.length < 2) return [title];
  let best = [title];
  let diff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' ');
    const b = words.slice(i).join(' ');
    if (Math.abs(a.length - b.length) < diff) {
      diff = Math.abs(a.length - b.length);
      best = [a, b];
    }
  }
  return best;
};

const pad2 = (n: number) => String(n).padStart(2, '0');

/** a line that rises into view through its own mask */
const Line = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span className={`block overflow-hidden ${className}`}>
    <span data-line className='block will-change-transform'>
      {children}
    </span>
  </span>
);

/** one tick per project, swelling where the strip is and how fast it moves */
const Ticks = ({
  count,
  active,
  pulse,
}: {
  count: number;
  active: number | null;
  pulse: Pulse;
}) => {
  const half = Math.ceil(count / 2);
  const ticks = useRef<(HTMLSpanElement | null)[]>([]);
  const open = useRef(active !== null);
  open.current = active !== null;

  useEffect(() => {
    let fade = 0;
    const tick = () => {
      fade = lerp(fade, open.current ? 1 : 0, damp(0.12, gsap.ticker.deltaRatio(60)));
      const reach = 0.7 + pulse.speed * 3.5;
      const grow = 0.45 + pulse.speed * 0.75;
      for (let i = 0; i < count; i++) {
        const el = ticks.current[i];
        if (!el) continue;
        const near = clamp(1 - Math.abs(wrapDelta(i - pulse.position, count)) / reach, 0, 1);
        const k = near * near * (3 - 2 * near) * (1 - fade);
        el.style.transform = `scaleY(${(1 + k * grow).toFixed(3)})`;
        el.style.opacity = (0.3 + k * 0.7).toFixed(3);
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [count, pulse]);

  const tickAt = (i: number) => (
    <span
      key={i}
      ref={(el) => {
        ticks.current[i] = el;
      }}
      className='block h-2.5 w-px bg-current opacity-30 will-change-transform'
    />
  );
  return (
    <div className='flex items-center gap-1.25' aria-hidden>
      {Array.from({ length: half }, (_, i) => tickAt(i))}
      <div
        className={`flex items-center justify-center gap-2.5 overflow-hidden text-[10px] tabular-nums transition-[max-width,opacity,margin] duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${active !== null ? 'mx-3 max-w-32 opacity-100' : 'mx-[-2.5px] max-w-0 opacity-0'}`}
      >
        <span>{pad2((active ?? 0) + 1)}</span>
        <span className='block h-3.5 w-6 shrink-0 border border-current' />
        <span>{pad2(count)}</span>
      </div>
      {Array.from({ length: count - half }, (_, i) => tickAt(half + i))}
    </div>
  );
};

/** the open project: its title over the image, its text along the bottom */
const Details = ({
  item,
  layout,
  cta,
}: {
  item: ClientItem | null;
  layout: Layout;
  cta: string;
}) => {
  // the last project stays on screen while it animates out, before the
  // next one (if any) comes in
  const [shown, setShown] = useState(item);
  const root = useRef<HTMLDivElement>(null);
  const leaving = useRef<gsap.core.Timeline>(null);
  useEffect(() => {
    if (item && !shown) setShown(item);
  }, [item, shown]);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || !shown) return;
    const chars = el.querySelectorAll('[data-char]');
    const lines = el.querySelectorAll('[data-line]');
    const grow = el.querySelectorAll('[data-grow]');
    gsap.killTweensOf([chars, lines, grow]);
    // its onComplete would swap in a project that is no longer the one asked for
    leaving.current?.kill();
    // the letters spread over a fixed amount, not a fixed gap: a gap made a
    // long title (the tourist map) take seconds to arrive
    if (item?.title === shown.title) {
      gsap.fromTo(
        chars,
        { yPercent: 130 },
        { yPercent: 0, duration: 1.1, delay: 0.35, ease: 'expo.out', stagger: { amount: 0.5, from: 'random' } },
      );
      gsap.fromTo(
        lines,
        { yPercent: 105 },
        { yPercent: 0, duration: 0.9, delay: 0.55, ease: 'expo.out', stagger: 0.02 },
      );
      gsap.fromTo(
        grow,
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, duration: 0.9, delay: 0.65, ease: 'expo.out' },
      );
    } else {
      // the next project comes in once all of this one is out, letters included:
      // they were still leaving when the text swapped
      leaving.current = gsap
        .timeline({ onComplete: () => setShown(item) })
        .to(chars, { yPercent: -130, duration: 0.5, ease: 'expo.in', stagger: { amount: 0.25, from: 'random' } }, 0)
        .to(grow, { scaleY: 0, transformOrigin: 'bottom', duration: 0.5, ease: 'expo.in' }, 0)
        .to(lines, { yPercent: -105, duration: 0.4, ease: 'expo.in', stagger: 0.01 }, 0);
    }
  }, [item, shown]);

  if (!shown) return <div ref={root} />;
  const lines = titleLines(shown.title.toUpperCase());
  // the longest line has to fit the title's width with its letters spread out
  const size = Math.min(
    layout.title.size,
    layout.title.w / (Math.max(...lines.map((l) => l.length)) * 0.72),
  );
  const lineH = size * 0.95;
  const bleed = size * 0.14;
  return (
    <div ref={root} className='pointer-events-none absolute inset-0 z-10'>
      <h3
        aria-label={shown.title}
        className='absolute left-1/2 -translate-x-1/2 font-title'
        style={{
          top: layout.vh / 2 - layout.open.h / 2 - layout.title.offset,
          width: layout.title.w,
        }}
      >
        {lines.map((line, l) => (
          <div
            key={l}
            aria-hidden
            className='flex justify-between'
            style={{ fontSize: size, height: lineH, lineHeight: `${lineH}px` }}
          >
            {[...line].map((ch, i) =>
              ch === ' ' ? (
                <span key={i} style={{ width: size * 0.3 }} />
              ) : (
                <span
                  key={i}
                  className='block overflow-hidden'
                  style={{ height: lineH + bleed * 2, margin: `${-bleed}px 0` }}
                >
                  <span data-char className='block will-change-transform' style={{ paddingTop: bleed }}>
                    {ch}
                  </span>
                </span>
              ),
            )}
          </div>
        ))}
      </h3>
      <div className='absolute inset-x-6 bottom-6 flex flex-col items-center gap-3 text-[11px] leading-relaxed md:inset-x-12 md:bottom-9 md:text-xs lg:inset-x-24 lg:block'>
        <p className='hidden font-semibold opacity-75 lg:absolute lg:bottom-0 lg:left-0 lg:block lg:max-w-[26%]'>
          <Line>{shown.description}</Line>
        </p>
        <div className='flex flex-col items-center gap-2.5 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2'>
          {shown.url && (
            <Line className='pb-1'>
              <a
                href={shown.url}
                target='_blank'
                rel='noopener noreferrer'
                // the stage closes the project on any other click
                onClick={(e) => e.stopPropagation()}
                className='pointer-events-auto inline-flex items-center gap-1 font-semibold whitespace-nowrap uppercase tracking-wide underline-offset-4 hover:underline'
              >
                {cta} {getHost(shown.url)}
                <ArrowUpRight className='size-3.5' />
              </a>
            </Line>
          )}
          <span data-grow className='block h-7 w-px origin-top bg-current' />
        </div>
        <p className='max-w-xl text-center lg:absolute lg:right-0 lg:bottom-0 lg:max-w-[34%] lg:text-left'>
          <Line>{shown.longDescription}</Line>
        </p>
      </div>
    </div>
  );
};

/**
 * The window's width and the stage's height, after mount; the server renders
 * a desktop guess. The stage is h-svh, so its height holds still while a
 * phone's browser bar slides away, where innerHeight grows past it and laid
 * the open project out for a taller stage than there is
 */
const useViewport = (stage: RefObject<HTMLDivElement | null>) => {
  const [size, setSize] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    const read = () => {
      const w = innerWidth;
      const h = stage.current?.clientHeight ?? innerHeight;
      // the bar fires resize as it slides; same size, same layout
      setSize((s) => (s.w === w && s.h === h ? s : { w, h }));
    };
    read();
    addEventListener('resize', read);
    return () => removeEventListener('resize', read);
  }, []);
  return size;
};

const Clients = ({
  copy,
  images,
}: {
  copy: ClientsCopy;
  /** optimised by the page, keyed by the same path the json holds */
  images: Record<string, OptimizedImage>;
}): ReactNode => {
  const items = useMemo<ClientItem[]>(() => Object.values(copy.items), [copy.items]);
  const n = items.length;
  const stage = useRef<HTMLDivElement>(null);
  const view = useViewport(stage);
  const layout = useMemo(() => layoutFor(view.w, view.h), [view]);
  const step = layout.slice.w + layout.slice.gap;
  // enough copies of the list to fill the width with some to spare
  const copies = Math.max(1, Math.ceil((layout.vw + layout.slice.w * 8) / (n * step)));
  const slices = useMemo(
    () => Array.from({ length: n * copies }, (_, i) => items[i % n]),
    [items, n, copies],
  );

  const [active, setActive] = useState<number | null>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const pics = useRef<(HTMLImageElement | null)[]>([]);
  const cache = useRef<Record<string, string | boolean>[]>([]);
  const pulse = useRef<Pulse>({ position: 0, speed: 0 }).current;
  const L = useRef(layout);
  L.current = layout;
  const activeRef = useRef(active);
  activeRef.current = active;
  // starts well off to the left and sweeps in rightwards the first time it is
  // seen, the same way the page scroll pushes it
  const s = useRef<Frame>({
    current: (layout.vw * 1.4) / step,
    previous: (layout.vw * 1.4) / step,
    target: 0,
    bend: 0,
    boost: 0,
    open: 0,
    active: null,
    focus: 0,
    hovered: -1,
    hover: [],
  }).current;
  const dragged = useRef(false);
  /** until then the page is still gliding into place and its scroll can't close */
  const settle = useRef(0);

  const close = () => setActive(null);
  /** the open project steps to its neighbour along the strip */
  const go = (d: number) =>
    setActive((a) => (a === null ? a : mod(a + d, slices.length)));

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.clients-heading > *', {
      opacity: 0,
      y: 60,
      ease: 'power3.out',
      stagger: 0.08,
      duration: 0.9,
      scrollTrigger: { trigger: '#clientsHomepage', start: 'top 70%' },
    });
  }, []);

  // open: the strip glides the chosen slice to the middle while it grows
  useEffect(() => {
    if (active !== null) {
      if (s.active === null) {
        gsap.killTweensOf(s, 'focus');
        s.focus = active;
        // the stage fills the screen, so the title and the text both show
        const top = stage.current!.getBoundingClientRect().top + scrollY;
        dispatchEvent(new CustomEvent('nav:scrollto', { detail: top }));
        settle.current = performance.now() + 1200;
      } else {
        // already open: the open place slides over to the next project
        gsap.to(s, {
          focus: s.focus + wrapDelta(active - s.focus, slices.length),
          duration: 1,
          ease: 'expo.inOut',
          overwrite: 'auto',
        });
      }
      s.active = active;
      s.target += wrapDelta(active - s.target, slices.length);
      gsap.to(s, { open: 1, duration: 1, ease: 'expo.inOut', overwrite: 'auto' });
    } else if (s.active !== null) {
      gsap.to(s, {
        open: 0,
        duration: 0.9,
        ease: 'expo.inOut',
        overwrite: 'auto',
        onComplete: () => {
          s.active = null;
        },
      });
    } else return;
    // a kick of bend as it moves, there and back
    gsap.fromTo(
      s,
      { boost: 0 },
      { boost: 1, duration: 0.5, ease: 'sine.inOut', yoyo: true, repeat: 1, overwrite: 'auto' },
    );
  }, [active, slices.length, s]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [active]);

  // drag with a fling, and a trackpad's sideways swipe; the vertical wheel
  // is left to the page
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    let id: number | null = null;
    let x = 0;
    let t = 0;
    let v = 0;
    let travel = 0;
    const move = (px: number) => {
      s.target += px / (L.current.slice.w + L.current.slice.gap);
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (activeRef.current === null) move(e.deltaX * (e.deltaMode === 1 ? 32 : 1));
    };
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      id = e.pointerId;
      x = e.clientX;
      t = performance.now();
      v = 0;
      travel = 0;
      dragged.current = false;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== id || activeRef.current !== null) return;
      const now = performance.now();
      const dx = e.clientX - x;
      travel += Math.abs(dx);
      if (travel > DRAG_THRESHOLD && !dragged.current) {
        dragged.current = true;
        el.setPointerCapture(e.pointerId);
      }
      v = dx / Math.max(1, now - t);
      x = e.clientX;
      t = now;
      if (dragged.current) move(-dx * DRAG_SPEED);
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== id) return;
      id = null;
      if (dragged.current && activeRef.current === null) move(-v * FLING * 16);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
    };
  }, [s]);

  // the per-frame pass, only while the strip is on screen
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    cache.current = [];
    const count = slices.length;
    let lastY = scrollY;
    let scrolled = 0;
    const frame = () => {
      const N = L.current;
      const w = N.slice.w + N.slice.gap;
      const dt = gsap.ticker.deltaRatio(60);
      const still = reduced();
      // the page scroll pushes the strip like the original's wheel, but the
      // other way: scrolling down sends the slices to the right. With a
      // project open it closes it instead
      const dy = scrollY - lastY;
      lastY = scrollY;
      if (activeRef.current === null) {
        s.target -= dy / w;
        scrolled = 0;
      } else if (performance.now() < settle.current) {
        scrolled = 0;
      } else if (Math.abs((scrolled += dy)) > CLOSE_ON_SCROLL) {
        scrolled = 0;
        setActive(null);
      }
      s.current = still ? s.target : lerp(s.current, s.target, damp(0.075, dt));
      const speed = (Math.abs(s.current - s.previous) * w) / dt;
      s.previous = s.current;
      s.bend = lerp(s.bend, clamp(speed / (N.slice.w * 0.6), 0, 1), damp(0.1, dt));
      const bend = still ? 0 : Math.min(1, s.bend + s.boost * 0.55);
      const k = s.open;
      const half = N.vw / 2;
      const h = lerp(N.slice.h, N.open.h, k);
      const opening = s.active !== null && k > 0;
      const centre = opening ? wrapDelta(s.focus - s.current, count) : 0;
      const side = N.open.w / 2 + N.open.gap + N.open.sideW / 2;
      // grey and dim at rest; how dim depends on the page's own ground
      const floor = document.documentElement.classList.contains('dark') ? 0.5 : 0.82;
      for (let i = 0; i < count; i++) {
        const card = cards.current[i];
        const img = pics.current[i];
        if (!card || !img) continue;
        const c = (cache.current[i] ??= {});
        const rel = wrapDelta(i - s.current, count);
        let x = rel * w;
        let cw = N.slice.w;
        /** 1 for the open slice, 0 for the rest */
        let lit = 0;
        if (opening) {
          // whole numbers at rest; in between, while the open place steps
          // along, each slice slides and grows or shrinks between its places
          const off = rel - centre;
          const dist = Math.abs(off);
          lit = clamp(1 - dist, 0, 1);
          const to =
            Math.sign(off) *
            (dist < 1 ? dist * side : side + (dist - 1) * (N.open.sideW + N.open.gap));
          x = lerp(x, to, k);
          cw = lerp(N.slice.w, lerp(N.open.sideW, N.open.w, lit), k);
        }
        const hidden = Math.abs(x) - cw / 2 > half + N.slice.w * 3;
        if (hidden !== c.hidden) {
          card.style.visibility = hidden ? 'hidden' : '';
          c.hidden = hidden;
        }
        if (hidden) continue;
        const j = x / half;
        const z = N.depth * bend * (1 - j * j);
        const rot = N.tilt * bend * clamp(j, -1.3, 1.3);
        const hover = (s.hover[i] = lerp(
          s.hover[i] ?? 0,
          i === s.hovered && s.active === null ? 1 : 0,
          damp(0.15, dt),
        ));
        const centred = clamp(1 - Math.abs(j) * 1.1, 0, 1);
        const colour = lerp(clamp(Math.max(bend * 1.3 * centred, hover), 0, 1), lit, k);
        const fade = opening ? lerp(1, lerp(0.3, 1, lit), k) : 1;
        // the picture is laid out at the open size and scaled to cover the
        // slice, sliding a little inside it as the slice crosses the stage
        const scale = Math.max(cw / N.open.w, h / N.open.h);
        const slack = Math.max(0, (N.open.w * scale - cw) / 2);
        const pan = clamp(-x * 0.15, -slack, slack) * (1 - k);
        const box = `${cw.toFixed(2)}|${h.toFixed(2)}`;
        if (box !== c.box) {
          card.style.width = `${cw}px`;
          card.style.height = `${h}px`;
          c.box = box;
        }
        const tf = `translate3d(${(x - cw / 2).toFixed(2)}px,${(-h / 2).toFixed(2)}px,${z.toFixed(2)}px) rotateY(${rot.toFixed(3)}deg)`;
        if (tf !== c.tf) card.style.transform = c.tf = tf;
        const op = fade.toFixed(3);
        if (op !== c.op) card.style.opacity = c.op = op;
        const itf = `translate3d(-50%,-50%,0) translateX(${pan.toFixed(2)}px) scale(${scale.toFixed(4)})`;
        if (itf !== c.itf) img.style.transform = c.itf = itf;
        const filter = `grayscale(${(1 - colour).toFixed(3)}) brightness(${(floor + (1 - floor) * colour + hover * 0.15).toFixed(3)})`;
        if (filter !== c.filter) img.style.filter = c.filter = filter;
      }
      pulse.position = mod(s.current, n);
      pulse.speed = bend;
    };
    let on = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === on) return;
      on = entry.isIntersecting;
      lastY = scrollY;
      if (on) gsap.ticker.add(frame);
      else gsap.ticker.remove(frame);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      gsap.ticker.remove(frame);
    };
  }, [slices, n, s, pulse]);

  const open = active !== null ? items[active % n] : null;
  const theme = open ? themes[open.image] : undefined;

  return (
    <section id='clientsHomepage' className='relative'>
      <div
        ref={stage}
        onClick={() => !dragged.current && active !== null && close()}
        // the arrows step the strip, or the open project, while focus is in it
        onKeyDown={(e) => {
          const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (!d) return;
          if (active !== null) go(d);
          else s.target += d;
        }}
        // the colours ease like the original's expo.inOut, in step with the slice
        className='relative h-svh touch-pan-y select-none overflow-hidden bg-background transition-[background-color,color] duration-900 ease-[cubic-bezier(.87,0,.13,1)]'
        style={{ perspective: layout.perspective, backgroundColor: theme?.bg, color: theme?.fg }}
      >
        <div
          // the top padding clears the floating nav pill
          className={`clients-heading pointer-events-none absolute inset-x-0 top-0 z-20 space-y-1.5 p-6 pt-24 pr-20 transition-opacity duration-500 md:space-y-3 md:px-12 md:pt-28 lg:px-24 ${open ? 'opacity-0' : ''}`}
        >
          <h2 className='font-title text-4xl md:text-5xl'>{copy.title}</h2>
          <p className='max-w-2xl font-semibold text-muted-foreground'>{copy.text}</p>
        </div>
        {/* from lg the theme cord hangs 7rem in from the right; these stay
            clear of it */}
        <div className='absolute top-24 right-6 z-20 flex h-9 items-center gap-4 md:top-28 md:right-12 lg:right-44'>
          <div className='hidden md:block'>
            <Ticks count={n} active={active !== null ? active % n : null} pulse={pulse} />
          </div>
          <button
            type='button'
            onClick={close}
            aria-label={copy.close}
            tabIndex={open ? 0 : -1}
            className={`grid size-9 place-items-center rounded-full border border-current/30 transition-[opacity,border-color] duration-500 hover:border-current ${open ? '' : 'pointer-events-none opacity-0'}`}
          >
            <X className='size-4' />
          </button>
        </div>
        {/* step through the projects without closing; on a phone they sit
            in the strip's margin, clear of the open image */}
        {[-1, 1].map((d) => (
          <button
            key={d}
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              go(d);
            }}
            aria-label={d < 0 ? copy.prev : copy.next}
            tabIndex={open ? 0 : -1}
            className={`absolute top-1/2 z-20 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-current/30 bg-inherit transition-[opacity,border-color] duration-500 hover:border-current md:size-11 ${d < 0 ? 'left-1 md:left-12 lg:left-24' : 'right-1 md:right-12 lg:right-24'} ${open ? '' : 'pointer-events-none opacity-0'}`}
          >
            {d < 0 ? <ArrowLeft className='size-4' /> : <ArrowRight className='size-4' />}
          </button>
        ))}
        <div className='absolute inset-0 transform-3d'>
          {slices.map((item, i) => {
            // one copy of each project takes focus; the rest are the loop
            const first = i < n;
            return (
              <button
                key={i}
                type='button'
                ref={(el) => {
                  cards.current[i] = el;
                }}
                aria-label={item.title}
                // no label once a project is open: the focus is the project
                data-cursor={active === null ? item.cursor : undefined}
                aria-hidden={!first || undefined}
                tabIndex={first ? 0 : -1}
                onClick={(e) => {
                  e.stopPropagation();
                  if (dragged.current) return;
                  if (active !== null) close();
                  else setActive(i);
                }}
                // keyboard focus only: a press focuses the slice too, and
                // gliding it away from under the pointer before the release
                // sends the click to the stage instead
                onFocus={(e) => {
                  if (active === null && e.currentTarget.matches(':focus-visible'))
                    s.target += wrapDelta(i - s.target, slices.length);
                }}
                onPointerEnter={() => {
                  s.hovered = i;
                }}
                onPointerLeave={() => {
                  if (s.hovered === i) s.hovered = -1;
                }}
                className='absolute top-1/2 left-1/2 cursor-pointer overflow-hidden bg-foreground/5 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground'
              >
                <Picture
                  image={images[item.image]}
                  alt=''
                  draggable={false}
                  sizes='(max-width: 767px) 80vw, 55vw'
                  ref={(el: HTMLImageElement | null) => {
                    pics.current[i] = el;
                  }}
                  style={{ width: layout.open.w, height: layout.open.h }}
                  className='absolute top-1/2 left-1/2 max-w-none object-cover will-change-transform'
                />
              </button>
            );
          })}
        </div>
        <Details item={open} layout={layout} cta={copy.cta} />
      </div>
    </section>
  );
};

export default Clients;
