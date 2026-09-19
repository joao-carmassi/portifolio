import { Player, type PlayerRef } from '@remotion/player';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { videos } from '@/components/about/videos';
import { FPS, type AboutVideo } from '@/components/about/videos/types';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const VideoPlayer = ({
  video,
  reduced,
}: {
  video: AboutVideo;
  reduced: boolean;
}) => {
  const box = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerRef>(null);

  useEffect(() => {
    if (reduced) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) player.current?.play();
      else player.current?.pause();
    });
    io.observe(box.current!);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div ref={box} aria-hidden='true' className='absolute inset-0'>
      <Player
        ref={player}
        component={video.component}
        durationInFrames={video.durationInFrames}
        fps={FPS}
        compositionWidth={video.width}
        compositionHeight={video.height}
        // reduced motion: never play, show the final held frame
        initialFrame={reduced ? video.durationInFrames - 1 : 0}
        loop
        // no audio: unmuted players wait on AudioContext.resume(), which never
        // resolves without a user gesture (scroll isn't one), freezing frame 0
        initiallyMuted
        numberOfSharedAudioTags={0}
        controls={false}
        clickToPlay={false}
        acknowledgeRemotionLicense
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

const AboutMeHomepage = () => {
  const section = useRef<HTMLElement>(null);
  // null until mounted: initialFrame is only read on mount, so wait for matchMedia
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.from('.about-tile', {
        autoAlpha: 0,
        y: 60,
        scale: 0.95,
        duration: 0.9,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: section.current,
          start: 'top 85%',
          once: true,
        },
      });
    },
    { scope: section },
  );

  return (
    <section ref={section} id='aboutMeHomepage' className='p-4 md:p-12'>
      <h2 className='font-title text-5xl md:text-7xl mb-8 md:mb-12 container'>
        Sobre mim
      </h2>
      {/* columns sized by each video's aspect ratio (1920/820 : 960/600) so both share one height */}
      <div className='grid gap-4 lg:grid-cols-[234fr_160fr]'>
        {videos.map((video) => (
          <figure
            key={video.id}
            style={{ aspectRatio: `${video.width} / ${video.height}` }}
            className='about-tile dark relative overflow-hidden rounded-3xl bg-black'
          >
            {reduced !== null && (
              <VideoPlayer video={video} reduced={reduced} />
            )}
            <figcaption className='sr-only'>
              {video.title}. {video.srText}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default AboutMeHomepage;
