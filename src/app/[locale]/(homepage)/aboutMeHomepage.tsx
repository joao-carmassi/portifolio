import { Variants } from 'motion/react';
import { IMessage } from '@/types/message';
import Grainient from '@/components/grainient/grainient';
import { H2 } from '@/components/ui/h2';
import ContainerCodigo from './containerCodigo';
import * as motion from 'motion/react-client';
import { Backlight } from '@/components/ui/backlight';

type Props = IMessage['homepage']['aboutMe'];

const animation: Variants = {
  hidden: { opacity: 0, y: 150, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 16,
      delay: 0.1,
    },
  },
};

const AboutMeHomepage = ({ title, textMobile, textDesktop }: Props) => {
  return (
    <section className='w-full min-h-screen relative'>
      <Grainient
        color1='#FF9FFC'
        color2='#5227FF'
        color3='#B19EEF'
        timeSpeed={0.25}
        colorBalance={0}
        warpStrength={1}
        warpFrequency={5}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={0}
        blendSoftness={0.05}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.1}
        grainScale={2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
        className='absolute! z-0!'
      />
      <div className='p-6 md:p-12 space-y-6 md:space-y-12 mx-auto max-w-7xl z-10 relative'>
        <H2 className='text-white drop-shadow-sm drop-shadow-black/25 text-center'>
          {title}
        </H2>
        <Backlight>
          <motion.div
            id='aboutMeHomepage'
            variants={animation}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
          >
            <div className='w-full p-5 bg-white flex items-center gap-4 rounded-t-xl'>
              <span className='inline-block w-4 aspect-square rounded-full duration-300 hover:scale-110 hover:shadow-md bg-[#fb2c36]' />
              <span className='inline-block w-4 aspect-square rounded-full duration-300 hover:scale-110 hover:shadow-md bg-[#fdc700]' />
              <span className='inline-block w-4 aspect-square rounded-full duration-300 hover:scale-110 hover:shadow-md bg-[#05df72]' />
            </div>
            <ContainerCodigo
              json={{ mobile: textMobile, desktop: textDesktop }}
            />
          </motion.div>
        </Backlight>
      </div>
    </section>
  );
};

export default AboutMeHomepage;
