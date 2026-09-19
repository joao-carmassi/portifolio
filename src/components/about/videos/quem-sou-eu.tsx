import { TransitionSeries, linearTiming } from '@remotion/transitions';
import {
  siAstro,
  siGreensock,
  siNextdotjs,
  siReact,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons';
import { AbsoluteFill, Img, Sequence } from 'remotion';
import { CheckList } from '@/components/remocn/check-list';
import { Drift } from '@/components/remocn/drift';
import { focusPull } from '@/components/remocn/focus-pull';
import { GlassCodeWalk } from '@/components/remocn/glass-code-walk';
import { grainDissolve } from '@/components/remocn/grain-dissolve';
import { Handwrite } from '@/components/remocn/handwrite';
import { InkUnderline } from '@/components/remocn/ink-underline';
import { LogoEnter, type Logo } from '@/components/remocn/logo-enter';
import { PaperSticker } from '@/components/remocn/paper-sticker';
import { Polaroid } from '@/components/remocn/polaroid';
import { pushThrough } from '@/components/remocn/push-through';
import { ShaderGrainGradient } from '@/components/remocn/shader-grain-gradient';
import { SoftBlurIn } from '@/components/remocn/soft-blur-in';
import { StaggeredFadeUp } from '@/components/remocn/staggered-fade-up';
import { whipPan } from '@/components/remocn/whip-pan';
import { WordStream, wordStreamLength } from '@/components/remocn/word-stream';
import { FPS, type AboutVideo } from './types';

// deliberately not the hero palette/shape: this one is a graphite-violet blob
const GRAIN_COLORS = ['#2e2a45', '#5b4f8f', '#a99ae0'];

const INK = '#f3eeff';
const MUTED = '#a89cc4';

const SANS = 'var(--font-raleway), sans-serif';

/**
 * StaggeredFadeUp hardcodes `background: white` on its own wrapper, which we
 * cannot override from the outside. `invert(1)` flips that white to black and
 * `lighten` drops the black onto the backdrop, so the colour below is the
 * inverse of the lavender that actually reaches the screen (#e9dcff).
 */
const SUBTITLE_INVERTED_INK = '#162300';

/** Dim grain gradient used on the two dark bookend scenes. */
const DimGrain = ({ opacity = 1 }: { opacity?: number }) => (
  <AbsoluteFill style={{ opacity }}>
    <ShaderGrainGradient
      colors={GRAIN_COLORS}
      colorBack='#050409'
      shape='blob'
      rotation={0}
      speed={0.18}
      softness={0.6}
      intensity={0.16}
      noise={0.22}
    />
  </AbsoluteFill>
);

/** Cheap, shader-free vignette for the middle scenes. */
const SoftVignette = () => (
  <AbsoluteFill
    style={{
      background:
        'radial-gradient(120% 90% at 50% 40%, #1b1626 0%, #0c0a12 55%, #050409 100%)',
    }}
  />
);

const Abertura = () => (
  <AbsoluteFill style={{ background: '#000000' }}>
    <DimGrain />
    <div
      style={{ position: 'absolute', left: 0, right: 0, top: 250, height: 200 }}
    >
      <SoftBlurIn
        text='João Vitor Carmassi'
        className='font-title!'
        fontSize={132}
        fontWeight={400}
        color={INK}
        blur={16}
      />
    </div>
    <Sequence from={26} layout='none'>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 470,
          height: 120,
          filter: 'invert(1)',
          mixBlendMode: 'lighten',
        }}
      >
        <StaggeredFadeUp
          text='desenvolvedor front-end'
          fontSize={46}
          fontWeight={500}
          staggerDelay={5}
          color={SUBTITLE_INVERTED_INK}
        />
      </div>
    </Sequence>
  </AbsoluteFill>
);

const Chip = ({ children }: { children: string }) => (
  <span
    style={{
      fontFamily: SANS,
      fontSize: 34,
      fontWeight: 600,
      color: '#26242c',
      letterSpacing: '-0.01em',
    }}
  >
    {children}
  </span>
);

const Origem = () => (
  <AbsoluteFill style={{ background: '#050409' }}>
    <SoftVignette />
    <Drift grow={0.05}>
      <div style={{ position: 'absolute', left: 240, top: 174 }}>
        <Polaroid width={720} caption='joão' captionAt={54}>
          <Img
            src='/images/about/joao.webp'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              // portrait source in a landscape window: bias upward to keep the face
              objectPosition: '50% 42%',
            }}
          />
        </Polaroid>
      </div>
    </Drift>
    <div
      style={{
        position: 'absolute',
        left: 1120,
        top: 280,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 44,
      }}
    >
      <PaperSticker at={72} seed='origem-sp' padding='14px 24px'>
        <Chip>nascido em são paulo, 2004</Chip>
      </PaperSticker>
      <PaperSticker at={96} seed='origem-sbs' padding='14px 24px'>
        <Chip>mora em são bento do sapucaí</Chip>
      </PaperSticker>
    </div>
  </AbsoluteFill>
);

const Kicker = ({ children }: { children: string }) => (
  <span
    style={{
      fontFamily: SANS,
      fontSize: 28,
      fontWeight: 600,
      letterSpacing: '0.42em',
      textTransform: 'uppercase',
      color: MUTED,
      alignSelf: 'center',
    }}
  >
    {children}
  </span>
);

const SERRA_TEXT = 'da serra de são bento|para o mundo todo|100% remoto';

/** photo holds the frame alone before the words start running over it */
const SERRA_PHOTO_BEAT = 18;

const Serra = () => (
  <AbsoluteFill style={{ background: '#050409' }}>
    <Drift grow={0.08}>
      <Img
        src='/images/about/pedra-do-bau.webp'
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          // rock sits left of centre; bias there and keep some cloud below it
          objectPosition: '44% 46%',
        }}
      />
    </Drift>
    {/* the shot is mostly white sky, so the type needs a hard scrim to survive */}
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(180deg, rgba(5,4,9,0.52) 0%, rgba(12,9,21,0.74) 46%, rgba(5,4,9,0.92) 100%)',
      }}
    />
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(64% 58% at 50% 46%, rgba(5,4,9,0.58) 0%, rgba(5,4,9,0) 72%)',
      }}
    />
    <Sequence from={SERRA_PHOTO_BEAT} layout='none'>
      <WordStream
        text={SERRA_TEXT}
        className='font-title!'
        fontSize={96}
        fontWeight={400}
        color={INK}
      />
    </Sequence>
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 54,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Kicker>pedra do baú</Kicker>
    </div>
  </AbsoluteFill>
);

const IDIOMAS = ['português · nativo', 'inglês · C1', 'espanhol · B2'];

const Idiomas = () => (
  <AbsoluteFill style={{ background: '#050409' }}>
    <SoftVignette />
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 48,
      }}
    >
      <Kicker>idiomas</Kicker>
      <CheckList
        items={IDIOMAS}
        width={957}
        fontSize={56}
        delay={12}
        color={INK}
        boxColor='rgba(243,238,255,0.55)'
        tickColor='#a78bfa'
      />
    </AbsoluteFill>
  </AbsoluteFill>
);

const CODE = `const joao = {
  nome: 'João Vitor Carmassi',
  base: 'São Bento do Sapucaí, SP',
  idiomas: { ingles: 'C1', espanhol: 'B2' },
  foco: 'front-end',
};`;

const EmCodigo = () => (
  <AbsoluteFill style={{ background: '#050409' }}>
    <SoftVignette />
    {/* GlassCodeWalk works on a fixed 1280x720 stage; centre it on the canvas */}
    <div
      style={{
        position: 'absolute',
        left: 320,
        top: 50,
        width: 1280,
        height: 720,
      }}
    >
      <GlassCodeWalk
        code={CODE}
        title='joao.ts'
        width={900}
        height={380}
        fontSize={18}
        staggerFrames={14}
        zoom={2.4}
      />
    </div>
  </AbsoluteFill>
);

/** simple-icons path in a LogoEnter chip; fg is picked per brand, not computed. */
const chip = (icon: SimpleIcon, bg: string, fg = '#ffffff'): Logo => ({
  bg,
  mark: (
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 24 24'
      role='img'
      aria-label={icon.title}
    >
      <path d={icon.path} fill={fg} />
    </svg>
  ),
});

const STACK: Logo[] = [
  chip(siAstro, `#${siAstro.hex}`),
  chip(siReact, `#${siReact.hex}`, '#0a0a0a'),
  // Next.js brand hex is pure black; invert it so the chip reads on a dark canvas.
  chip(siNextdotjs, '#ffffff', '#000000'),
  chip(siTypescript, `#${siTypescript.hex}`),
  chip(siTailwindcss, `#${siTailwindcss.hex}`),
  chip(siGreensock, `#${siGreensock.hex}`),
];

const Ferramentas = () => (
  <AbsoluteFill style={{ background: '#050409' }}>
    <SoftVignette />
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 56,
      }}
    >
      <Kicker>no dia a dia</Kicker>
      <div style={{ position: 'relative', width: '100%', height: 150 }}>
        <LogoEnter logos={STACK} diameter={128} overlap={40} stagger={7} />
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// "pedra do baú" moved to the Serra photo, so the chip is just the activity now
const FORA = ['trilhas', 'viajar de moto', 'música', 'games', 'filmes'];

const ForaDoCodigo = () => (
  <AbsoluteFill style={{ background: '#050409' }}>
    <SoftVignette />
    <Drift grow={0.04}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 210,
          height: 150,
        }}
      >
        <Handwrite
          text='fora do código'
          fontSize={104}
          color='#d9cdff'
          delay={8}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 470,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 34,
        }}
      >
        {FORA.map((item, i) => (
          <PaperSticker
            key={item}
            // last sticker must land well before the outgoing dissolve at 126
            at={32 + i * 15}
            seed={`fora-${i}`}
            padding='14px 24px'
          >
            <Chip>{item}</Chip>
          </PaperSticker>
        ))}
      </div>
    </Drift>
  </AbsoluteFill>
);

const Assinatura = () => (
  <AbsoluteFill style={{ background: '#000000' }}>
    <DimGrain opacity={0.8} />
    <div
      style={{ position: 'absolute', left: 0, right: 0, top: 290, height: 220 }}
    >
      <SoftBlurIn
        text='joão.'
        className='font-title!'
        fontSize={200}
        fontWeight={400}
        color={INK}
        blur={18}
      />
    </div>
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 512,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <InkUnderline
        width={560}
        color='#c4a3ff'
        thickness={14}
        delay={30}
        durationSteps={6}
        seed='assinatura'
      />
    </div>
    {/* handle lands after the underline has finished drawing (delay 30 + 6 steps) */}
    <Sequence from={54} layout='none'>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 570,
          height: 90,
        }}
      >
        <SoftBlurIn
          text='github.com/joao-carmassi'
          fontSize={34}
          fontWeight={600}
          color={MUTED}
          blur={8}
        />
      </div>
    </Sequence>
  </AbsoluteFill>
);

// scene lengths before transition overlap
const S_ABERTURA = Math.round(3.3 * FPS);
const S_ORIGEM = Math.round(5.5 * FPS);
// WordStream drives its own length; add a beat so the last phrase can sit still
const S_SERRA = SERRA_PHOTO_BEAT + wordStreamLength(SERRA_TEXT) + 34;
const S_IDIOMAS = Math.round(5 * FPS);
const S_CODIGO = Math.round(5.5 * FPS);
const S_FERRAMENTAS = Math.round(3.8 * FPS);
const S_FORA = Math.round(5 * FPS);
const S_ASSINATURA = Math.round(4.3 * FPS);

const T_WHIP = 14;
const T_PUSH = 18;
const T_FOCUS = 18;
const T_GRAIN = 24;

const SCENES = [
  S_ABERTURA,
  S_ORIGEM,
  S_SERRA,
  S_IDIOMAS,
  S_CODIGO,
  S_FERRAMENTAS,
  S_FORA,
  S_ASSINATURA,
];
const TRANSITIONS = [T_WHIP, T_PUSH, T_FOCUS, T_GRAIN, T_PUSH, T_WHIP, T_GRAIN];

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

const DURATION = sum(SCENES) - sum(TRANSITIONS);

const QuemSouEu = () => (
  <AbsoluteFill style={{ background: '#000000' }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={S_ABERTURA}>
        <Abertura />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={whipPan({ direction: 'left' })}
        timing={linearTiming({ durationInFrames: T_WHIP })}
      />
      <TransitionSeries.Sequence durationInFrames={S_ORIGEM}>
        <Origem />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={pushThrough()}
        timing={linearTiming({ durationInFrames: T_PUSH })}
      />
      <TransitionSeries.Sequence durationInFrames={S_SERRA}>
        <Serra />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={focusPull()}
        timing={linearTiming({ durationInFrames: T_FOCUS })}
      />
      <TransitionSeries.Sequence durationInFrames={S_IDIOMAS}>
        <Idiomas />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={grainDissolve({
          colors: GRAIN_COLORS,
          colorBack: '#050409',
          shape: 'blob',
        })}
        timing={linearTiming({ durationInFrames: T_GRAIN })}
      />
      <TransitionSeries.Sequence durationInFrames={S_CODIGO}>
        <EmCodigo />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={pushThrough()}
        timing={linearTiming({ durationInFrames: T_PUSH })}
      />
      <TransitionSeries.Sequence durationInFrames={S_FERRAMENTAS}>
        <Ferramentas />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={whipPan({ direction: 'right' })}
        timing={linearTiming({ durationInFrames: T_WHIP })}
      />
      <TransitionSeries.Sequence durationInFrames={S_FORA}>
        <ForaDoCodigo />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={grainDissolve({
          colors: GRAIN_COLORS,
          colorBack: '#050409',
          shape: 'blob',
        })}
        timing={linearTiming({ durationInFrames: T_GRAIN })}
      />
      <TransitionSeries.Sequence durationInFrames={S_ASSINATURA}>
        <Assinatura />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);

export const quemSouEu: AboutVideo = {
  id: 'quem-sou-eu',
  title: 'Quem sou eu',
  component: QuemSouEu,
  width: 1920,
  height: 820,
  durationInFrames: DURATION,
  srText:
    'Animação de cerca de 33 segundos em oito cenas. Abre com o nome João Vitor Carmassi e a legenda "desenvolvedor front-end". Em seguida, um polaroid com a foto dele e duas etiquetas: "nascido em são paulo, 2004" e "mora em são bento do sapucaí". Depois, uma foto aérea da Pedra do Baú saindo das nuvens, com a legenda "pedra do baú" e as frases "da serra de são bento", "para o mundo todo" e "100% remoto". Na sequência, a lista de idiomas: português nativo, inglês C1 e espanhol B2. Um editor de código mostra o objeto joao com nome, base em São Bento do Sapucaí, idiomas inglês C1 e espanhol B2, e foco em front-end. Sob o rótulo "no dia a dia" aparecem os logos de Astro, React, Next.js, TypeScript, Tailwind e GSAP. A cena "fora do código" traz as etiquetas trilhas, viajar de moto, música, games e filmes. Fecha com a assinatura "joão." sublinhada e o endereço github.com/joao-carmassi.',
};
