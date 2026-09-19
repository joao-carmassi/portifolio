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
  abertura: 90,
  briefing: 130,
  pesquisa: 105,
  terminal: 200,
  codigo: 175,
  seo: 140,
  responsivo: 130,
  auditoria: 175,
  construido: 105,
  lighthouse: 145,
  deploy: 110,
  assinatura: 95,
};
const XFADE = Math.round(FPS * (2 / 3));
const TRANSITIONS = 11;
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

// Placeholders stay as "..." on purpose: the scene shows which tags get written,
// not invented copy for a client that does not exist.
const SEO_CODE = `<title>... | ...</title>
<meta name="description" content="..." />
<meta property="og:image" content="/og.webp" />
<link rel="canonical" href="https://..." />

<h1>...</h1>
<img src="/hero.webp" alt="..." />

<script type="application/ld+json">
  { "@type": "LocalBusiness", "name": "..." }
</script>`;

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
// Order matters: CheckList staggers by index, so the longest handwriting must
// not sit last or it runs past the cut.
const REQUISITOS = [
  { text: 'layout responsivo', checked: false },
  { text: 'ser achado no Google', checked: false },
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

const QUERY = 'site institucional';
const RELACIONADOS = [
  'criar site institucional',
  'site institucional preço',
  'site institucional rápido',
];

/** Caption in Geist Mono pinned to the bottom of a scene. */
const Footnote = ({ text }: { text: string }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 58,
      width: '100%',
      textAlign: 'center',
      fontFamily: MONO,
      fontSize: 18,
      color: '#71717a',
      letterSpacing: '0.18em',
    }}
  >
    {text}
  </div>
);

function Pesquisa() {
  const frame = useCurrentFrame();
  const typed = Math.floor(
    interpolate(frame, [8, 38], [0, QUERY.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  // 2.5 Hz caret, derived from the frame so it stays a pure function.
  const caretOn = Math.floor(frame / 12) % 2 === 0;

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Label text='pesquisa de palavras-chave' top={86} />
      <div
        style={{
          width: 720,
          marginTop: 44,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            height: 68,
            padding: '0 24px',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(255,255,255,0.05)',
          }}
        >
          <svg width='24' height='24' viewBox='0 0 24 24' aria-hidden='true'>
            <circle
              cx='10.5'
              cy='10.5'
              r='6.5'
              fill='none'
              stroke={ACCENT[1]}
              strokeWidth='2'
            />
            <path
              d='M15.5 15.5 L21 21'
              stroke={ACCENT[1]}
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
          <span style={{ fontFamily: MONO, fontSize: 26, color: '#fafafa' }}>
            {QUERY.slice(0, typed)}
          </span>
          {caretOn && (
            <span
              style={{
                width: 14,
                height: 28,
                background: 'rgba(250,250,250,0.7)',
              }}
            />
          )}
        </div>

        {RELACIONADOS.map((termo, i) => {
          const local = frame - (42 + i * 9);
          const opacity = interpolate(local, [0, 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const y = interpolate(local, [0, 12], [16, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={termo}
              style={{
                opacity,
                translate: `0 ${y}px`,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 24px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                fontFamily: SANS,
                fontSize: 22,
                color: 'rgba(250,250,250,0.86)',
              }}
            >
              <span style={{ fontFamily: MONO, color: ACCENT[2] }}>↗</span>
              {termo}
            </div>
          );
        })}
      </div>
      <Footnote text='termos do nicho do cliente' />
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

function Seo() {
  return (
    <AbsoluteFill>
      <GlassCodeBlock
        code={SEO_CODE}
        title='seo.astro'
        width={900}
        height={430}
        fontSize={18}
        staggerFrames={8}
        aura
      />
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

function Auditoria() {
  return (
    <AbsoluteFill style={{ scale: '1.08' }}>
      {/* chunkSize 2 keeps seven lines inside the scene's frame budget. */}
      <TerminalSimulator
        title='~/portifolio'
        chunkSize={2}
        lines={[
          { text: 'npx tsc --noEmit', type: 'command', delay: 0 },
          { text: '✓ sem erros de tipo', type: 'success', delay: 8 },
          {
            text: 'npx lighthouse http://localhost:4321',
            type: 'command',
            delay: 10,
          },
          { text: '! 3 imagens sem alt', type: 'error', delay: 8 },
          { text: '! h2 antes do h1 em /sobre', type: 'error', delay: 4 },
          { text: '! sem meta description', type: 'error', delay: 4 },
          { text: '✓ corrigido e revalidado', type: 'success', delay: 10 },
        ]}
      />
    </AbsoluteFill>
  );
}

function Construido() {
  return (
    <AbsoluteFill>
      <Label text='construído com' top={92} />
      <AbsoluteFill style={{ translate: '0 24px' }}>
        <LogoEnter logos={STACK} diameter={100} overlap={34} stagger={6} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

const SCORES = [
  { label: 'performance', highlight: false },
  { label: 'acessibilidade', highlight: false },
  { label: 'boas práticas', highlight: false },
  { label: 'seo', highlight: true },
];

function Lighthouse() {
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Label text='lighthouse' top={92} />
      <div style={{ display: 'flex', gap: 28, marginTop: 40 }}>
        {SCORES.map((score, i) => (
          <div key={score.label} style={{ width: 250 }}>
            {/* Relative box so each RollingNumber's AbsoluteFill stays in its column. */}
            <div style={{ position: 'relative', height: 110 }}>
              <Sequence from={i * 8} durationInFrames={105} layout='none'>
                <RollingNumber
                  from={0}
                  to={100}
                  fontSize={82}
                  color='#fafafa'
                />
              </Sequence>
            </div>
            <div
              style={{
                marginTop: 10,
                textAlign: 'center',
                fontFamily: MONO,
                fontSize: 17,
                letterSpacing: '0.12em',
                color: score.highlight ? ACCENT[1] : '#a1a1aa',
              }}
            >
              {score.label}
            </div>
          </div>
        ))}
      </div>
      <Footnote text='build de produção' />
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
        <TransitionSeries.Sequence durationInFrames={SCENE.pesquisa}>
          <Pesquisa />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={grainDissolve(GRAIN)}
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
        <TransitionSeries.Sequence durationInFrames={SCENE.seo}>
          <Seo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={pushThrough()}
          timing={linearTiming({ durationInFrames: XFADE })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE.responsivo}>
          <Responsivo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={grainDissolve(GRAIN)}
          timing={linearTiming({ durationInFrames: XFADE })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE.auditoria}>
          <Auditoria />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={focusPull()}
          timing={linearTiming({ durationInFrames: XFADE })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE.construido}>
          <Construido />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={whipPan({ direction: 'left' })}
          timing={linearTiming({ durationInFrames: XFADE })}
        />
        <TransitionSeries.Sequence durationInFrames={SCENE.lighthouse}>
          <Lighthouse />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={pushThrough()}
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
    'Animação de cerca de 46 segundos que mostra um projeto nascendo: as frases "Uma ideia", "Um prazo", "Um site" abrem a história; em seguida uma lista escrita à mão reúne o que o site precisa — layout responsivo, ser achado no Google, animação com GSAP e lighthouse 100; começa então a pesquisa de palavras-chave: um campo de busca digita "site institucional" e surgem os termos relacionados do nicho do cliente — criar site institucional, site institucional preço e site institucional rápido; um terminal roda npm create astro@latest, instala as dependências e adiciona Tailwind e GSAP; o arquivo hero.tsx é escrito linha a linha com um botão de Contato, e um cursor clica nele; no arquivo seo.astro aparecem o title, a meta description, a og:image, o link canonical, o h1, o alt da imagem e um bloco de dados estruturados JSON-LD do tipo LocalBusiness; a tela do site então encolhe de desktop para celular, o menu vira um ícone e os cards se empilham, mostrando o layout responsivo; no terminal, npx tsc --noEmit confirma que não há erros de tipo e npx lighthouse audita o site local, apontando três imagens sem alt, um h2 antes do h1 e a falta de meta description, tudo corrigido e revalidado em seguida; depois aparecem os logos de React, Next.js, Astro, TypeScript, Tailwind e GSAP sob o rótulo "construído com"; na tela seguinte, quatro contadores do Lighthouse sobem de 0 a 100 em performance, acessibilidade, boas práticas e SEO, medidos na build de produção; git push origin main confirma "deploy em 1.2s" e confetes comemoram; a animação fecha com a palavra "no ar." sublinhada à mão.',
};
