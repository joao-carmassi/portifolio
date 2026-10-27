// shared by both "sobre mim" videos (see brand.css). Builds the brand layers
// into #root and adds the logo intro and outro, the captions and the
// transitions to a paused GSAP timeline. Every tween is a pure function of
// time, so hyperframes can seek to any frame.
(function () {
  // the JC monogram from public/favicon.svg, cropped to its strokes
  const J = 'M 51 50 L 51 70 A 8 8 0 0 1 35 70';
  const C = 'M 87.03 52.53 A 14 14 0 1 0 87.03 75.47';
  const NAME = 'João Carmassi';
  // where the intro's mark lands (its centre, in px) and its scale there:
  // the mark is 56x36 units, so 2.75 makes it 154x99 px
  const MX = 960, MY = 352, MK = 2.75;
  // the favicon's stroke, in mark units
  const STROKE = 5;

  const chars = (t) => t.split('').map((c) => `<span class="ch">${c}</span>`).join('');
  const words = (el, text) => {
    el.innerHTML = text.split(' ').map((w) => `<span class="w">${w}</span>`).join(' ');
    return Array.from(el.querySelectorAll('.w'));
  };
  const markSvg = () =>
    `<svg class="mark" viewBox="33 46 56 36" aria-hidden="true">` +
    `<path class="mj" pathLength="1" d="${J}"/><path class="mc" pathLength="1" d="${C}"/></svg>`;
  const markGroup = (id) => `<g id="${id}"><path class="mj" pathLength="1" d="${J}"/><path class="mc" pathLength="1" d="${C}"/></g>`;

  const mount = (root) => {
    const add = (html) => root.insertAdjacentHTML('beforeend', html);
    // one horizontal motion blur, shared by whatever is whipping past
    add(`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
      <filter id="mbX" x="-30%" y="-5%" width="160%" height="110%" color-interpolation-filters="sRGB"><feGaussianBlur id="mbXg" stdDeviation="0 0"/></filter>
      <filter id="glow8" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
    </defs></svg>`);
    add(`<div id="bIntro" class="layer"><div id="introGlow"></div>
      <svg id="introSvg" viewBox="0 0 1920 820">${markGroup('ie2')}${markGroup('ie1')}${markGroup('im')}</svg>
      <div id="introName">${chars(NAME)}</div></div>`);
    add(`<div id="bOutro" class="layer"><svg id="outroGrid" viewBox="0 0 1920 820">
      ${[120, 600, 1320, 1800].map((x) => `<line pathLength="1" x1="${x}" x2="${x}" y1="-10" y2="830"/>`).join('')}
      ${[96, 724].map((y) => `<line pathLength="1" x1="-10" x2="1930" y1="${y}" y2="${y}"/>`).join('')}
      </svg><div class="lockup" id="outroLock">${markSvg()}<div class="word">${chars(NAME)}</div></div></div>`);
    add(`<div id="bFlash" class="layer"></div><div id="bVignette" class="layer"></div><div id="bBlack" class="layer"></div>`);
    gsap.set(['#introSvg path', '#outroLock path', '#outroGrid line'], { attr: { 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 } });
    gsap.set('#outroLock', { opacity: 0 });
  };

  // a group of the mark, centred on (MX, MY) at scale s and rotation r. The
  // stroke is set per frame in screen px, so a huge mark still draws hairlines
  const place = (g, s, r, px) => {
    g.setAttribute('transform', `translate(${MX} ${MY}) rotate(${r}) scale(${s}) translate(-61 -64)`);
    g.setAttribute('stroke-width', px / s);
  };

  const draw = (tl, sel, t, duration, ease = 'power2.inOut') =>
    tl.fromTo(sel, { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration, ease, immediateRender: false }, t);

  // 0 -> 2.95s, after the Socoloff opening: the mark's own strokes cross the
  // frame as hairlines at 34x, draw themselves while the camera pulls back,
  // and land as the logo; the name arrives under it
  const intro = (tl) => {
    const cam = { s: 34, r: -16, px: 1.4, echo: 0.42 };
    const gm = document.getElementById('im');
    const g1 = document.getElementById('ie1');
    const g2 = document.getElementById('ie2');
    const apply = () => {
      place(gm, cam.s, cam.r, cam.px);
      place(g1, cam.s * 1.6, cam.r * 1.8 - 6, 1.1);
      place(g2, cam.s * 2.5, cam.r * 2.6 + 9, 1);
      g1.style.opacity = cam.echo;
      g2.style.opacity = cam.echo * 0.6;
    };
    apply();
    tl.set('#bIntro', { opacity: 1 }, 0);
    tl.to(cam, { s: MK, r: 0, duration: 1.75, ease: 'power3.inOut', onUpdate: apply }, 0);
    tl.to(cam, { px: MK * STROKE, duration: 0.5, ease: 'power2.inOut', onUpdate: apply }, 1.25);
    tl.to(cam, { echo: 0, duration: 0.6, ease: 'power1.in', onUpdate: apply }, 0.85);
    draw(tl, '#introSvg .mj', 0.05, 1.05);
    draw(tl, '#introSvg .mc', 0.18, 1.05);
    tl.fromTo('#introGlow', { opacity: 0, scale: 0.7 }, { opacity: 0.65, scale: 1, duration: 0.35, ease: 'power2.out' }, 1.55);
    tl.to('#introGlow', { opacity: 0.18, scale: 1.25, duration: 1.0, ease: 'power2.inOut' }, 1.9);
    tl.fromTo('#introName .ch', { opacity: 0, y: 14, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.42, stagger: 0.022, ease: 'power2.out' }, 1.62);
    tl.to('#bIntro', { opacity: 0, scale: 1.05, filter: 'blur(14px)', duration: 0.35, ease: 'power2.in' }, 2.6);
  };

  // t0 -> end, after the Socoloff close: black, a faint grid draws, the small
  // logo comes out of the blur, holds, leaves, and the frame ends black so the
  // loop starts where it ends
  const outro = (tl, t0, end) => {
    tl.fromTo('#bOutro', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power1.inOut', immediateRender: false }, t0 - 0.05);
    tl.to('#outroGrid line', { attr: { 'stroke-dashoffset': 0 }, duration: 0.8, ease: 'power2.inOut', stagger: 0.05 }, t0 + 0.05);
    tl.fromTo('#outroLock', { opacity: 0, scale: 0.97, filter: 'blur(14px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out', immediateRender: false }, t0 + 0.3);
    draw(tl, '#outroLock .mj', t0 + 0.3, 0.5);
    draw(tl, '#outroLock .mc', t0 + 0.4, 0.6);
    tl.to('#outroLock', { opacity: 0, filter: 'blur(12px)', duration: 0.5, ease: 'power2.in' }, end - 0.75);
    tl.to('#outroGrid', { opacity: 0, duration: 0.5 }, end - 0.7);
  };

  // the caption: word by word out of the blur
  const capIn = (tl, ws, t, stagger = 0.08) =>
    tl.fromTo(ws, { opacity: 0, y: 10, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, stagger, ease: 'power2.out' }, t);
  const blurOut = (tl, targets, t, duration = 0.35) =>
    tl.to(targets, { opacity: 0, filter: 'blur(10px)', duration, ease: 'power2.in' }, t);

  // a dip through white, peaking at t: the hard cut to light in the Linear film
  const flash = (tl, t, peak = 1) => {
    tl.fromTo('#bFlash', { opacity: 0 }, { opacity: peak, duration: 0.3, ease: 'power2.in', immediateRender: false }, t - 0.3);
    tl.to('#bFlash', { opacity: 0, duration: 0.55, ease: 'power2.out' }, t);
  };

  // a whip pan: out leaves left and in arrives from the right, both under
  // one horizontal motion blur
  const whip = (tl, out, inn, t, dist = 1100, dur = 0.55) => {
    tl.set(inn, { opacity: 1 }, t);
    tl.set([out, inn], { filter: 'url(#mbX)' }, t);
    tl.fromTo('#mbXg', { attr: { stdDeviation: '0 0' } }, { attr: { stdDeviation: '80 0' }, duration: dur * 0.45, ease: 'power2.in', immediateRender: false }, t);
    tl.to('#mbXg', { attr: { stdDeviation: '0 0' }, duration: dur * 0.55, ease: 'power2.out' }, t + dur * 0.45);
    tl.to(out, { x: -dist, duration: dur * 0.7, ease: 'power3.in' }, t);
    tl.fromTo(inn, { x: dist }, { x: 0, duration: dur * 0.75, ease: 'power3.out', immediateRender: false }, t + dur * 0.25);
    tl.set(out, { opacity: 0 }, t + dur * 0.7);
    tl.set([out, inn], { filter: 'none' }, t + dur);
  };

  window.BRAND = { mount, intro, outro, capIn, blurOut, flash, whip, words, chars, markSvg };
})();
