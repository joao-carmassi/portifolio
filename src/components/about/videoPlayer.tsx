import { Player, type PlayerRef } from '@remotion/player';
import { useEffect, useRef } from 'react';
import { videos } from '@/components/about/videos';
import {
  FPS,
  type AboutVideo,
  type VideoId,
  type VideoImages,
} from '@/components/about/videos/types';
import type { AboutCopy } from '@/i18n';

// its own module so the about section can lazy load it: remotion and both
// compositions stay out of any page that shows stills instead

// generic over the id: that is what keeps a composition's script prop typed to
// its own slice of the locale file instead of the union of both
const VideoPlayer = <Id extends VideoId>({
  video,
  copy,
  images,
  reduced,
}: {
  video: AboutVideo<Id>;
  copy: AboutCopy['videos'][Id];
  images: VideoImages;
  reduced: boolean;
}) => {
  const box = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerRef>(null);
  const durationInFrames = video.durationInFrames(copy.script);

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
        inputProps={{ images, script: copy.script }}
        durationInFrames={durationInFrames}
        fps={FPS}
        compositionWidth={video.width}
        compositionHeight={video.height}
        // reduced motion: never play, show the final held frame
        initialFrame={reduced ? durationInFrames - 1 : 0}
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

// branches on the id so each side keeps its own generic
const AboutVideoPlayer = ({
  id,
  copy,
  images,
  reduced,
}: {
  id: VideoId;
  copy: AboutCopy['videos'];
  images: VideoImages;
  reduced: boolean;
}) => {
  const [a, b] = videos;
  return id === a.id ? (
    <VideoPlayer video={a} copy={copy[a.id]} images={images} reduced={reduced} />
  ) : (
    <VideoPlayer video={b} copy={copy[b.id]} images={images} reduced={reduced} />
  );
};

export default AboutVideoPlayer;
