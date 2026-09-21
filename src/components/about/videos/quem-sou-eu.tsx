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
import {
  AbsoluteFill,
  Img,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { CheckList } from '@/components/remocn/check-list';
import { Drift } from '@/components/remocn/drift';
import { focusPull } from '@/components/remocn/focus-pull';
import { GlassCodeWalk } from '@/components/remocn/glass-code-walk';
import { grainDissolve } from '@/components/remocn/grain-dissolve';
import { Handwrite } from '@/components/remocn/handwrite';
import { InkUnderline } from '@/components/remocn/ink-underline';
import { PaperSticker } from '@/components/remocn/paper-sticker';
import { Polaroid } from '@/components/remocn/polaroid';
import { pushThrough } from '@/components/remocn/push-through';
import { ShaderGrainGradient } from '@/components/remocn/shader-grain-gradient';
import { SoftBlurIn } from '@/components/remocn/soft-blur-in';
import { StaggeredFadeUp } from '@/components/remocn/staggered-fade-up';
import { whipPan } from '@/components/remocn/whip-pan';
import { WordStream, wordStreamLength } from '@/components/remocn/word-stream';
import {
  FPS,
  type AboutVideo,
  type VideoProps,
  type VideoScript,
} from './types';

type Props = VideoProps<'quem-sou-eu'>;
type Script = VideoScript<'quem-sou-eu'>;

// keys into the optimised urls the page passes in, see src/lib/images.ts
const JOAO = '/about/joao.webp';
const PEDRA_DO_BAU = '/about/pedra-do-bau.webp';

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

const Abertura = ({ script }: { script: Script }) => (
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
          text={script.subtitle}
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

const Origem = ({ images, script }: Props) => (
  <AbsoluteFill style={{ background: '#050409' }}>
    <SoftVignette />
    <Drift grow={0.05}>
      <div style={{ position: 'absolute', left: 340, top: 83 }}>
        {/* portrait window, to match the 2:3 photo instead of cropping it */}
        <Polaroid
          width={500}
          mediaRatio={4 / 5}
          captionSize={32}
          caption='joão'
          captionAt={54}
        >
          <Img
            src={images[JOAO]}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '50% 38%',
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
      {Object.values(script.stickers).map((text, i) => (
        <PaperSticker
          key={text}
          at={72 + i * 24}
          seed={`origem-${i}`}
          padding='14px 24px'
        >
          <Chip>{text}</Chip>
        </PaperSticker>
      ))}
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

/** photo holds the frame alone before the words start running over it */
const SERRA_PHOTO_BEAT = 18;

const Serra = ({ images, script }: Props) => (
  <AbsoluteFill style={{ background: '#050409' }}>
    <Drift grow={0.08}>
      <Img
        src={images[PEDRA_DO_BAU]}
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
        text={script.serra}
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
      <Kicker>{script.serraCaption}</Kicker>
    </div>
  </AbsoluteFill>
);

const Idiomas = ({ script }: { script: Script }) => (
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
      <Kicker>{script.languagesLabel}</Kicker>
      <CheckList
        items={Object.values(script.languages)}
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

const EmCodigo = ({ script }: { script: Script }) => (
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
        code={script.code}
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

// brand names never translate; `script.tools` holds what each one is for, in
// the same order
const TOOLS: { icon: SimpleIcon; name: string }[] = [
  { icon: siAstro, name: 'Astro' },
  { icon: siReact, name: 'React' },
  { icon: siNextdotjs, name: 'Next.js' },
  { icon: siTypescript, name: 'TypeScript' },
  { icon: siTailwindcss, name: 'Tailwind' },
  { icon: siGreensock, name: 'GSAP' },
];

/** Next.js' brand hex is pure black and would vanish on the dark tile. */
const brandFill = (icon: SimpleIcon) =>
  icon.hex.toLowerCase() === '000000' ? '#ffffff' : `#${icon.hex}`;

const ToolCard = ({
  icon,
  name,
  use,
  at,
}: {
  icon: SimpleIcon;
  name: string;
  use: string;
  at: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - at,
    fps,
    config: { damping: 14, mass: 0.6 },
  });

  return (
    <div
      style={{
        width: 258,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 22,
        opacity: enter,
        transform: `translateY(${(1 - enter) * 54}px)`,
      }}
    >
      <div
        style={{
          width: 132,
          height: 132,
          borderRadius: 34,
          display: 'grid',
          placeItems: 'center',
          background: 'rgba(243,238,255,0.06)',
          border: '1px solid rgba(243,238,255,0.14)',
        }}
      >
        <svg
          width={64}
          height={64}
          viewBox='0 0 24 24'
          role='img'
          aria-label={name}
        >
          <path d={icon.path} fill={brandFill(icon)} />
        </svg>
      </div>
      <div style={{ textAlign: 'center', fontFamily: SANS }}>
        <div style={{ fontSize: 30, fontWeight: 600, color: INK }}>{name}</div>
        <div style={{ fontSize: 24, fontWeight: 500, color: MUTED }}>{use}</div>
      </div>
    </div>
  );
};

const Ferramentas = ({ script }: { script: Script }) => (
  <AbsoluteFill style={{ background: '#050409' }}>
    <SoftVignette />
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 64,
      }}
    >
      <Kicker>{script.toolsLabel}</Kicker>
      <div style={{ display: 'flex', gap: 32 }}>
        {TOOLS.map((tool, i) => (
          <ToolCard
            key={tool.name}
            {...tool}
            use={Object.values(script.tools)[i]}
            at={i * 5}
          />
        ))}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

const ForaDoCodigo = ({ script }: { script: Script }) => (
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
          text={script.offLabel}
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
        {Object.values(script.off).map((item, i) => (
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
const sSerra = (script: Script) =>
  SERRA_PHOTO_BEAT + wordStreamLength(script.serra) + 34;
const S_IDIOMAS = Math.round(5 * FPS);
const S_CODIGO = Math.round(5.5 * FPS);
const S_FERRAMENTAS = Math.round(4.6 * FPS);
const S_FORA = Math.round(5 * FPS);
const S_ASSINATURA = Math.round(4.3 * FPS);

const T_WHIP = 14;
const T_PUSH = 18;
const T_FOCUS = 18;
const T_GRAIN = 24;

const scenes = (script: Script) => [
  S_ABERTURA,
  S_ORIGEM,
  sSerra(script),
  S_IDIOMAS,
  S_CODIGO,
  S_FERRAMENTAS,
  S_FORA,
  S_ASSINATURA,
];
const TRANSITIONS = [T_WHIP, T_PUSH, T_FOCUS, T_GRAIN, T_PUSH, T_WHIP, T_GRAIN];

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

const duration = (script: Script) => sum(scenes(script)) - sum(TRANSITIONS);

const QuemSouEu = ({ images, script }: Props) => (
  <AbsoluteFill style={{ background: '#000000' }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={S_ABERTURA}>
        <Abertura script={script} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={whipPan({ direction: 'left' })}
        timing={linearTiming({ durationInFrames: T_WHIP })}
      />
      <TransitionSeries.Sequence durationInFrames={S_ORIGEM}>
        <Origem images={images} script={script} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={pushThrough()}
        timing={linearTiming({ durationInFrames: T_PUSH })}
      />
      <TransitionSeries.Sequence durationInFrames={sSerra(script)}>
        <Serra images={images} script={script} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={focusPull()}
        timing={linearTiming({ durationInFrames: T_FOCUS })}
      />
      <TransitionSeries.Sequence durationInFrames={S_IDIOMAS}>
        <Idiomas script={script} />
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
        <EmCodigo script={script} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={pushThrough()}
        timing={linearTiming({ durationInFrames: T_PUSH })}
      />
      <TransitionSeries.Sequence durationInFrames={S_FERRAMENTAS}>
        <Ferramentas script={script} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={whipPan({ direction: 'right' })}
        timing={linearTiming({ durationInFrames: T_WHIP })}
      />
      <TransitionSeries.Sequence durationInFrames={S_FORA}>
        <ForaDoCodigo script={script} />
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

export const quemSouEu: AboutVideo<'quem-sou-eu'> = {
  id: 'quem-sou-eu',
  component: QuemSouEu,
  width: 1920,
  height: 820,
  durationInFrames: duration,
};
