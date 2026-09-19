import {
  siAstro,
  siGreensock,
  siNextdotjs,
  siReact,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
} from 'remotion';
import { linearTiming, TransitionSeries } from '@remotion/transitions';
import { Backdrop } from '@/components/remocn/backdrop';
import { CheckList } from '@/components/remocn/check-list';
import { Confetti } from '@/components/remocn/confetti';
import { focusPull } from '@/components/remocn/focus-pull';
import { GlassCodeBlock } from '@/components/remocn/glass-code-block';
import { grainDissolve } from '@/components/remocn/grain-dissolve';
import { InkUnderline } from '@/components/remocn/ink-underline';
import { LogoEnter, type Logo } from '@/components/remocn/logo-enter';
import { pushThrough } from '@/components/remocn/push-through';
import { RollingNumber } from '@/components/remocn/rolling-number';
import { SimulatedCursor } from '@/components/remocn/simulated-cursor';
import { SoftBlurIn } from '@/components/remocn/soft-blur-in';
import { TerminalSimulator } from '@/components/remocn/terminal-simulator';
import { whipPan } from '@/components/remocn/whip-pan';
import { WordStream } from '@/components/remocn/word-stream';
import { FPS, type AboutVideo } from './types';

// Scene lengths are in frames because they are tuned to the frame budgets the
// remocn sub-components need to finish their own animations before each cut.
const SCENE = {
  abertura: 100,
  briefing: 130,
  terminal: 200,
  codigo: 190,
  responsivo: 130,
  checagem: 145,
  resultado: 140,
  deploy: 110,
  assinatura: 95,
};
const XFADE = Math.round(FPS * (2 / 3));
const TRANSITIONS = 8;
const TOTAL =
  Object.values(SCENE).reduce((a, b) => a + b, 0) - TRANSITIONS * XFADE;

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
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 24 24'
        role='img'
        aria-label={icon.title}
      >
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

/** Serif caption shared by the scenes that need a title over their subject. */
const Label = ({ text, top }: { text: string; top: number }) => (
  <div
    style={{
      position: 'absolute',
      top,
      width: '100%',
      textAlign: 'center',
      fontFamily: SERIF,
      fontSize: 30,
      color: ACCENT[1],
      letterSpacing: '0.04em',
    }}
  >
    {text}
  </div>
);

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

// Unchecked on purpose: at this point in the story nothing is built yet, so the
// boxes stay open and only the handwriting animates.
const REQUISITOS = [
  { text: 'layout responsivo', checked: false },
  { text: 'animação com GSAP', checked: false },
  { text: 'lighthouse 100', checked: false },
];

function Briefing() {
  return (
    <AbsoluteFill>
      <Label text='o que o site precisa' top={92} />
      {/* AbsoluteFill does not centre its children on its own */}
      <AbsoluteFill
        style={{
          translate: '0 36px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CheckList
          items={REQUISITOS}
          width={780}
          fontSize={54}
          delay={12}
          color='#fafafa'
          boxColor='rgba(250,250,250,0.5)'
          tickColor={ACCENT[1]}
        />
      </AbsoluteFill>
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

const Block = ({ flex, radius = 10 }: { flex: number; radius?: number }) => (
  <div
    style={{
      flex,
      borderRadius: radius,
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.08)',
    }}
  />
);

function Responsivo() {
  const frame = useCurrentFrame();
  const width = interpolate(frame, [24, 84], [1000, 400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  // Derived from the frame, so the breakpoint flip stays a pure function.
  const stacked = width < 620;

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Label text='responsivo por padrão' top={78} />
      <div
        style={{
          width,
          height: 360,
          marginTop: 40,
          padding: 20,
          borderRadius: 18,
          border: '1px solid rgba(255,255,255,0.16)',
          background: 'rgba(255,255,255,0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          overflow: 'hidden',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 12, height: 16 }}
        >
          <div
            style={{
              width: 96,
              height: 12,
              borderRadius: 6,
              background: ACCENT[1],
            }}
          />
          <div style={{ flex: 1 }} />
          {stacked ? (
            <div
              style={{
                width: 26,
                height: 12,
                borderTop: '3px solid rgba(255,255,255,0.7)',
                borderBottom: '3px solid rgba(255,255,255,0.7)',
              }}
            />
          ) : (
            <div style={{ display: 'flex', gap: 14 }}>
              {['sobre', 'projetos', 'contato'].map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: SANS,
                    fontSize: 15,
                    color: 'rgba(250,250,250,0.7)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
        <div
          style={{
            height: 96,
            borderRadius: 12,
            background: `linear-gradient(110deg, ${ACCENT[0]}, ${ACCENT[3]} 55%, ${ACCENT[2]})`,
            opacity: 0.55,
            flexShrink: 0,
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: stacked ? 'column' : 'row',
            gap: 14,
            flex: 1,
          }}
        >
          <Block flex={1} />
          <Block flex={1} />
          <Block flex={1} />
        </div>
      </div>
    </AbsoluteFill>
  );
}

function Checagem() {
  return (
    <AbsoluteFill style={{ scale: '1.08' }}>
      <TerminalSimulator
        title='~/portifolio'
        lines={[
          { text: 'npx tsc --noEmit', type: 'command', delay: 0 },
          { text: '✓ sem erros de tipo', type: 'success', delay: 10 },
          { text: 'git commit -m "feat: hero"', type: 'command', delay: 10 },
          { text: '[main 9f2c1ab] 3 arquivos', type: 'log', delay: 6 },
        ]}
      />
    </AbsoluteFill>
  );
}

function Resultado() {
  return (
    <AbsoluteFill>
      <Label text='construído com' top={92} />

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

function Assinatura() {
  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 200,
          height: 180,
        }}
      >
        {/* SoftBlurIn defaults to Geist Sans; font-title swaps in DM Serif. */}
        <SoftBlurIn
          text='no ar.'
          className='font-title!'
          fontSize={140}
          fontWeight={400}
          color='#fafafa'
          blur={16}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 380,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <InkUnderline
          width={440}
          color={ACCENT[1]}
          thickness={12}
          delay={26}
          durationSteps={6}
          seed='deploy-assinatura'
        />
      </div>
    </AbsoluteFill>
  );
}

const GRAIN = {
  colors: [ACCENT[3], ACCENT[0], ACCENT[1]],
  colorBack: '#0a0a0a',
  shape: 'blob' as const,
};

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
        <TransitionSeries.Sequence durationInFrames={SCENE.briefing}>
          <Briefing />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={pushThrough()}
          timing={linearTiming({ durationInFrames: XFADE })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE.terminal}>
          <Terminal />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={focusPull()}
          timing={linearTiming({ durationInFrames: XFADE })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE.codigo}>
          <Codigo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={whipPan({ direction: 'right' })}
          timing={linearTiming({ durationInFrames: XFADE })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE.responsivo}>
          <Responsivo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={grainDissolve(GRAIN)}
          timing={linearTiming({ durationInFrames: XFADE })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE.checagem}>
          <Checagem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={pushThrough()}
          timing={linearTiming({ durationInFrames: XFADE })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE.resultado}>
          <Resultado />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={whipPan({ direction: 'left' })}
          timing={linearTiming({ durationInFrames: XFADE })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE.deploy}>
          <Deploy />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={focusPull()}
          timing={linearTiming({ durationInFrames: XFADE })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE.assinatura}>
          <Assinatura />
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
    'Animação de cerca de 36 segundos que mostra um projeto nascendo: as frases "Uma ideia", "Um prazo", "Um site" abrem a história; em seguida uma lista escrita à mão reúne o que o site precisa — layout responsivo, animação com GSAP e lighthouse 100; um terminal roda npm create astro@latest, instala as dependências e adiciona Tailwind e GSAP; o arquivo hero.tsx é escrito linha a linha com um botão de Contato, e um cursor clica nele; a tela do site então encolhe de desktop para celular, o menu vira um ícone e os cards se empilham, mostrando o layout responsivo; no terminal, npx tsc --noEmit confirma que não há erros de tipo e um git commit registra a alteração; depois aparecem os logos de React, Next.js, Astro, TypeScript, Tailwind e GSAP sob o rótulo "construído com", com um contador subindo de 0 a 100 no Lighthouse; git push origin main confirma "deploy em 1.2s" e confetes comemoram; a animação fecha com a palavra "no ar." sublinhada à mão.',
};
