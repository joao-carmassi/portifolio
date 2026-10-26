// adapted from skiper67 (skiper-ui.com/v1/skiper67): a play label that follows
// the cursor over a video, and a popover the video opens into on the same
// spring. Here the panel grows out of the card that was clicked and shrinks
// back into it: both are 1920x820, so a translate and one scale map one onto
// the other, on the compositor. Client only: it portals to body
import { AnimatePresence, motion, useReducedMotion, useSpring } from 'motion/react';
import { Play, X } from 'lucide-react';
import {
  MediaControlBar,
  MediaController,
  MediaPlayButton,
  MediaTimeRange,
} from 'media-chrome/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

const RATIO = 1920 / 820;
// the open panel's corner, in px
const RADIUS = 12;
const SPRING = { type: 'spring', stiffness: 100, damping: 20 } as const;

// the panel's box, by the same rule as its width class below. client sizes,
// not inner: the fixed dialog does not cover the scrollbar
const panelBox = () => {
  const { clientWidth: vw, clientHeight: vh } = document.documentElement;
  const w = Math.min(vw - 64, (vh - 64) * RATIO);
  const h = w / RATIO;
  return { left: (vw - w) / 2, top: (vh - h) / 2, w, h };
};

// the transform that lays the panel exactly over the clicked card. The scale
// shrinks the panel's corners too, so its radius starts at the card's own
// divided by the scale: on screen the corners match the card's, then ease to
// RADIUS as it grows
const flipOf = (el: Element) => {
  const r = el.getBoundingClientRect();
  const p = panelBox();
  const scale = r.width / p.w;
  return {
    x: r.left + r.width / 2 - (p.left + p.w / 2),
    y: r.top + r.height / 2 - (p.top + p.h / 2),
    scale,
    borderRadius: parseFloat(getComputedStyle(el).borderTopLeftRadius) / scale,
  };
};

type Flip = ReturnType<typeof flipOf>;

export const VideoPopover = ({
  src,
  poster,
  title,
  playLabel,
  closeLabel,
  children,
}: {
  src: string;
  poster: string;
  title: string;
  playLabel: string;
  closeLabel: string;
  // the card's own content: the looping preview
  children: ReactNode;
}) => {
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  // where the panel starts and ends. The page cannot scroll while it is open,
  // so the card is still there on close
  const [from, setFrom] = useState<Flip>();
  const reduced = useReducedMotion();

  const x = useSpring(0, { mass: 0.1 });
  const y = useSpring(0, { mass: 0.1 });
  const opacity = useSpring(0, { mass: 0.1 });

  const show = () => {
    setFrom(flipOf(trigger.current!));
    setOpen(true);
  };
  const hide = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const el = dialog.current!;
    // the page stays put without touching overflow: hiding the scrollbar
    // would shift the whole page sideways mid-animation. Stopping propagation
    // keeps lenis (listening on window) from scrolling it either
    const hold = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    el.addEventListener('wheel', hold, { passive: false });
    el.addEventListener('touchmove', hold, { passive: false });
    // the rest of the page goes inert: no tabbing out, nothing read behind it
    const behind = [...document.body.children].filter(
      (c): c is HTMLElement => c !== el && c instanceof HTMLElement,
    );
    behind.forEach((c) => (c.inert = true));
    close.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && hide();
    addEventListener('keydown', onKey);
    return () => {
      removeEventListener('keydown', onKey);
      el.removeEventListener('wheel', hold);
      el.removeEventListener('touchmove', hold);
      behind.forEach((c) => (c.inert = false));
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      {children}
      {/* no z-index: a stacking context here would stop the label blending with the video */}
      <button
        ref={trigger}
        type='button'
        aria-label={`${playLabel}: ${title}`}
        onClick={() => show()}
        onPointerMove={(e) => {
          opacity.set(1);
          const b = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - b.left);
          y.set(e.clientY - b.top);
        }}
        onPointerLeave={() => opacity.set(0)}
        className='absolute inset-0 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset'
      >
        <motion.span
          style={{ x, y, opacity }}
          className='pointer-events-none absolute top-0 left-0 flex items-center gap-2 p-2 text-sm text-white mix-blend-exclusion'
        >
          <Play className='size-4 fill-white' /> {playLabel}
        </motion.span>
        {/* no cursor to follow on touch screens, so the label sits in the middle */}
        <span className='pointer-events-none absolute inset-0 hidden items-center justify-center [@media(hover:none)]:flex'>
          <span className='flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm text-white'>
            <Play className='size-4 fill-white' /> {playLabel}
          </span>
        </span>
      </button>

      {createPortal(
        <AnimatePresence>
          {open && from && (
            <div
              ref={dialog}
              role='dialog'
              aria-modal='true'
              aria-label={title}
              className='fixed inset-0 z-[101] flex items-center justify-center'
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                // near black in both themes: the video almost fills the screen, and
                // a light theme's white would frame it in bright bars
                className='absolute inset-0 bg-black/90 backdrop-blur-lg'
                onClick={() => hide()}
              />
              <motion.div
                initial={{ ...from, opacity: 0 }}
                animate={{ x: 0, y: 0, scale: 1, borderRadius: RADIUS, opacity: 1 }}
                exit={{
                  ...from,
                  opacity: 0,
                  transition: reduced
                    ? { duration: 0 }
                    : { ...SPRING, opacity: { duration: 0.2, delay: 0.6 } },
                }}
                transition={
                  reduced ? { duration: 0 } : { ...SPRING, opacity: { duration: 0.15 } }
                }
                className='relative aspect-[1920/820] w-[min(calc(100%-4rem),calc((100dvh-4rem)*1920/820))] overflow-hidden bg-black will-change-transform'
              >
                <MediaController className='size-full [--media-control-background:transparent] [--media-control-hover-background:transparent]'>
                  <video
                    slot='media'
                    src={src}
                    poster={poster}
                    autoPlay
                    muted
                    playsInline
                    className='size-full object-cover'
                  />
                  <MediaControlBar className='absolute bottom-0 left-0 flex w-full items-center px-5 mix-blend-exclusion md:px-10 md:py-5'>
                    <MediaPlayButton className='h-4 bg-transparent' />
                    <MediaTimeRange className='bg-transparent [--media-range-thumb-opacity:0] [--media-range-track-height:2px]' />
                  </MediaControlBar>
                </MediaController>
                <button
                  ref={close}
                  type='button'
                  aria-label={closeLabel}
                  onClick={() => hide()}
                  className='absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full text-white mix-blend-exclusion outline-none focus-visible:ring-2 focus-visible:ring-white'
                >
                  <X className='size-5' />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};
