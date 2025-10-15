import FundoColorido from '@/components/fundoColorido';
import { H2 } from '@/components/ui/h2';
import ContainerCodigo from './containerCodigo';
import { Variants } from 'motion/react';
import { getMessages } from '@/utils/getMessages';
import * as motion from 'motion/react-client';

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

const AboutMeHomepage = async ({ locale }: { locale: string }) => {
  const t = await getMessages(locale, 'homepage');
  const { title, textMobile, textDesktop } = t('aboutMe');

  return (
    <FundoColorido id='aboutMeHomepage'>
      <div className='p-6 md:p-12 space-y-6 md:space-y-12 mx-auto max-w-7xl'>
        <H2 className='text-white drop-shadow-sm drop-shadow-black/25 text-center'>
          {title}
        </H2>
        <motion.div
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
      </div>
    </FundoColorido>
  );
};

export default AboutMeHomepage;
