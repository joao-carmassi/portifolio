import {
  siAstro,
  siGreensock,
  siNextdotjs,
  siReact,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons';
import { AbsoluteFill, Sequence } from 'remotion';
import { linearTiming, TransitionSeries } from '@remotion/transitions';
import { Backdrop } from '@/components/remocn/backdrop';
import { Confetti } from '@/components/remocn/confetti';
import { focusPull } from '@/components/remocn/focus-pull';
import { GlassCodeBlock } from '@/components/remocn/glass-code-block';
import { LogoEnter, type Logo } from '@/components/remocn/logo-enter';
import { pushThrough } from '@/components/remocn/push-through';
import { RollingNumber } from '@/components/remocn/rolling-number';
import { SimulatedCursor } from '@/components/remocn/simulated-cursor';
import { TerminalSimulator } from '@/components/remocn/terminal-simulator';
import { whipPan } from '@/components/remocn/whip-pan';
import { WordStream } from '@/components/remocn/word-stream';
import { FPS, type AboutVideo } from './types';

// Scene lengths are in frames because they are tuned to the frame budgets the
// remocn sub-components need to finish their own animations before each cut.
const SCENE = { abertura: 100, terminal: 200, codigo: 190, resultado: 130, deploy: 110 };
const XFADE = Math.round(FPS * (2 / 3));
const TOTAL =
  Object.values(SCENE).reduce((a, b) => a + b, 0) - 4 * XFADE;

const ACCENT = ['#7300ff', '#eba8ff', '#00bfff', '#2b00ff'];

const SERIF = 'var(--font-dm-serif), Georgia, serif';
const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const SANS = 'var(--font-raleway), system-ui, sans-serif';

const BG_GRADIENT =
  'radial-gradient(120% 90% at 18% 0%, rgba(115,0,255,0.20), transparent 62%),' +
  'radial-gradient(90% 80% at 88% 100%, rgba(0,191,255,0.14), transparent 60%),' +
  '#0a0a0a';

/** Perceived luminance of a simple-icons hex, to pick a readable mark color. */
function markColor(hex: string): string {
  const n = Number.parseInt(hex, 16);
  const lum =
    (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.6 ? '#0a0a0a' : '#ffffff';
}

function iconChip(icon: SimpleIcon, bg?: string, fg?: string): Logo {
  const fill = fg ?? markColor(icon.hex);
  return {
    bg: bg ?? `#${icon.hex}`,
    mark: (
      <svg width='100%' height='100%' viewBox='0 0 24 24' role='img' aria-label={icon.title}>
        <path d={icon.path} fill={fill} />
      </svg>
    ),
  };
}

const STACK: Logo[] = [
  iconChip(siReact),
  // Next.js brand hex is pure black; invert it so the chip reads on a dark canvas.
  iconChip(siNextdotjs, '#ffffff', '#000000'),
  iconChip(siAstro),
  iconChip(siTypescript),
  iconChip(siTailwindcss),
  iconChip(siGreensock),
];

const HERO_CODE = `export function Hero() {
  return (
    <section className='hero'>
      <h1>João Carmassi</h1>
      <button>Contato</button>
    </section>
  );
}`;

function Abertura() {
  return (
    <AbsoluteFill>
      <WordStream
        text='Uma ideia.|Um prazo.|Um site.'
        fontSize={86}
        color='#fafafa'
        fontWeight={500}
      />
    </AbsoluteFill>
  );
}

function Terminal() {
  return (
    <AbsoluteFill style={{ scale: '1.12' }}>
      <TerminalSimulator
        title='~/portifolio'
        lines={[
          { text: 'npm create astro@latest', type: 'command', delay: 0 },
          { text: '✔ Template copied', type: 'log', delay: 8 },
          { text: '✔ Dependencies installed', type: 'log', delay: 6 },
          { text: 'npm i tailwindcss gsap', type: 'command', delay: 10 },
          { text: 'added 84 packages in 3s', type: 'log', delay: 8 },
          { text: '✔ projeto pronto', type: 'success', delay: 8 },
        ]}
      />
    </AbsoluteFill>
  );
}

function Codigo() {
  return (
    <AbsoluteFill>
      <GlassCodeBlock
        code={HERO_CODE}
        title='hero.tsx'
        width={900}
        height={430}
        staggerFrames={10}
        aura
      />
      {/* Cursor waits for the last line to land, then clicks the Contato button. */}
      <Sequence from={70} layout='none'>
        <SimulatedCursor
          color='#eba8ff'
          size={30}
          points={[
            { x: 300, y: 590 },
            { x: 900, y: 230, hold: 22 },
            { x: 560, y: 285, hold: 60, click: true },
          ]}
        />
      </Sequence>
    </AbsoluteFill>
  );
}

function Resultado() {
  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 92,
          width: '100%',
          textAlign: 'center',
          fontFamily: SERIF,
          fontSize: 30,
          color: '#eba8ff',
          letterSpacing: '0.04em',
        }}
      >
        construído com
      </div>

      <AbsoluteFill style={{ translate: '0 -40px' }}>
        <LogoEnter logos={STACK} diameter={100} overlap={34} stagger={6} />
      </AbsoluteFill>

      <Sequence from={30} durationInFrames={100} layout='none'>
        <AbsoluteFill style={{ translate: '0 116px' }}>
          <RollingNumber from={0} to={100} fontSize={88} color='#fafafa' />
        </AbsoluteFill>
      </Sequence>

      <div
        style={{
          position: 'absolute',
          bottom: 62,
          width: '100%',
          textAlign: 'center',
          fontFamily: MONO,
          fontSize: 18,
          color: '#71717a',
          letterSpacing: '0.18em',
        }}
      >
        lighthouse
      </div>
    </AbsoluteFill>
  );
}

function Deploy() {
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ scale: '1.05' }}>
        <TerminalSimulator
          title='~/portifolio'
          lines={[
            { text: 'git push origin main', type: 'command', delay: 0 },
            { text: '✓ deploy em 1.2s', type: 'success', delay: 12 },
          ]}
        />
      </AbsoluteFill>
      <Confetti
        startFrame={58}
        lifetime={50}
        particleCount={120}
        originY={0.46}
        colors={[...ACCENT, '#fafafa']}
      />
    </AbsoluteFill>
  );
}

function DaIdeiaAoDeploy() {
  return (
    <AbsoluteFill style={{ background: '#0a0a0a', fontFamily: SANS }}>
      <Backdrop fill={{ type: 'gradient', value: BG_GRADIENT }} />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE.abertura}>
          <Abertura />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={whipPan({ direction: 'left' })}
          timing={linearTiming({ durationInFrames: XFADE })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE.terminal}>
          <Terminal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={whipPan({ direction: 'left' })}
          timing={linearTiming({ durationInFrames: XFADE })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE.codigo}>
          <Codigo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={pushThrough()}
          timing={linearTiming({ durationInFrames: XFADE })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE.resultado}>
          <Resultado />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={focusPull()}
          timing={linearTiming({ durationInFrames: XFADE })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE.deploy}>
          <Deploy />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
}

export const daIdeiaAoDeploy: AboutVideo = {
  id: 'da-ideia-ao-deploy',
  title: 'Da ideia ao deploy',
  component: DaIdeiaAoDeploy,
  width: 1440,
  height: 615,
  durationInFrames: TOTAL,
  srText:
    'Animação de cerca de 22 segundos que mostra um projeto nascendo: as frases "Uma ideia", "Um prazo", "Um site" abrem a história; um terminal roda npm create astro@latest, instala as dependências e adiciona Tailwind e GSAP; o arquivo hero.tsx é escrito linha a linha com um botão de Contato, e um cursor clica nele; em seguida aparecem os logos de React, Next.js, Astro, TypeScript, Tailwind e GSAP sob o rótulo "construído com", com um contador subindo de 0 a 100 no Lighthouse; no fim, git push origin main confirma "deploy em 1.2s" e confetes comemoram.',
};
