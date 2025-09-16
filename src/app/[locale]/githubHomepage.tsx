import { Button } from '@/components/ui/button';
import { BookOpen, Code, Github, Laptop, Layers } from 'lucide-react';
import { H2 } from '../../components/ui/h2';
import { P } from '@/components/ui/p';
import { H3 } from '@/components/ui/h3';
import { Variants } from 'motion/react';
import AnimatedDiv from '@/components/ui/animatedDiv';
import { MagicCard } from '@/components/magicui/magic-card';
import { getMessages } from '@/utils/getMessages';
import Img from '@/components/Image';

const animationPc: Variants[] = [
  {
    hidden: { opacity: 0, x: 150, scale: 0.95 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 16,
        delay: 0.1,
      },
    },
  },
  {
    hidden: { opacity: 0, x: -150, scale: 0.95 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 16,
        delay: 0.1,
      },
    },
  },
];

const animationCell: Variants[] = [
  {
    hidden: { opacity: 0, y: -150, scale: 0.95 },
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
  },
  {
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
  },
];

const GithubHomepage = async ({ locale }: { locale: string }) => {
  const t = await getMessages(locale, 'homepage');
  const { title, text, cards } = t('github');

  return (
    <section id='githubHomepage' className='shadow-md'>
      <div className='mx-auto max-w-7xl p-6 md:p-12 space-y-6 md:space-y-12'>
        <div className='space-y-1.5 md:space-y-3'>
          <H2 className='text-center md:text-start'>{title}</H2>
          <P className='text-center md:text-start'>{text}</P>
        </div>
        <div className='grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-3 gap-6'>
          {/* Card 1 */}
          <AnimatedDiv
            viewport={{ amount: 0.15, once: true, margin: '-150px' }}
            variants={animationCell[0]}
            initial='hidden'
            whileInView='show'
            className='col-span-1 md:col-span-2 lg:col-span-1'
          >
            <MagicCard className='rounded-xl' gradientColor='bg-card'>
              {/* Media 1 Mobile */}
              <div className='rounded-xl p-3 md:p-6 shadow-lg flex flex-col gap-3 md:gap-6'>
                <div className='md:hidden aspect-video w-full bg-background rounded-xl mb-3'>
                  <Img
                    className='object-cover h-full w-full rounded-xl'
                    src='/imgs/github-profile-img.png'
                    alt=''
                  />
                </div>
                <H3>{cards[0].title}</H3>
                <ul className='space-y-4'>
                  <li>
                    <div className='flex items-start gap-3'>
                      <Laptop className='shrink-0' />
                      <p className='-mt-0.5'>{cards[0].text1}</p>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-start gap-3'>
                      <Code className='shrink-0' />
                      <p className='-mt-0.5'>{cards[0].text2}</p>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-start gap-3'>
                      <Layers className='shrink-0' />
                      <p className='-mt-0.5'>{cards[0].text3}</p>
                    </div>
                  </li>
                </ul>
                <Button
                  effect={'expandIcon'}
                  icon={Github}
                  iconPlacement='right'
                  className='w-full mt-auto'
                  asChild
                >
                  <a target='_blank' href='https://github.com/joao-carmassi'>
                    {cards[0].button}
                  </a>
                </Button>
              </div>
            </MagicCard>
          </AnimatedDiv>
          {/* Media 1 Desktop */}
          <AnimatedDiv
            viewport={{ amount: 0.15, once: true }}
            variants={animationPc[0]}
            initial='hidden'
            whileInView='show'
            className='hidden md:block bg-muted rounded-xl col-span-1 md:col-span-3 lg:col-span-2'
          >
            <Img
              className='object-cover h-full w-full rounded-xl'
              src='/imgs/github-profile-img.png'
              alt=''
            />
          </AnimatedDiv>
          {/* Media 2 Desktop */}
          <AnimatedDiv
            viewport={{ amount: 0.15, once: true }}
            variants={animationPc[1]}
            initial='hidden'
            whileInView='show'
            className='hidden md:block bg-muted rounded-xl col-span-1 md:col-span-3 lg:col-span-2 '
          >
            <Img
              className='object-cover h-full w-full rounded-xl'
              src='/imgs/github-organization-img.png'
              alt=''
            />
          </AnimatedDiv>
          {/* Card 2 */}
          <AnimatedDiv
            viewport={{ amount: 0.15, once: true }}
            variants={animationCell[1]}
            initial='hidden'
            whileInView='show'
            className='col-span-1 md:col-span-2 lg:col-span-1'
          >
            <MagicCard className='rounded-xl' gradientColor='bg-card'>
              {/* Media 1 Mobile */}
              <div className='rounded-xl p-3 md:p-6 shadow-lg flex flex-col gap-3 md:gap-6'>
                <div className='md:hidden aspect-video w-full bg-background rounded-xl mb-3'>
                  <Img
                    className='object-cover h-full w-full rounded-xl'
                    src='/imgs/github-organization-img.png'
                    alt=''
                  />
                </div>
                <H3>{cards[1].title}</H3>
                <ul className='space-y-4'>
                  <li>
                    <div className='flex items-start gap-3'>
                      <BookOpen className='shrink-0' />
                      <p className='-mt-0.5'>{cards[1].text1}</p>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-start gap-3'>
                      <Layers className='shrink-0' />
                      <p className='-mt-0.5'>{cards[1].text2}</p>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-start gap-3'>
                      <Code className='shrink-0' />
                      <p className='-mt-0.5'>{cards[1].text3}</p>
                    </div>
                  </li>
                </ul>
                <Button
                  effect={'expandIcon'}
                  icon={Github}
                  iconPlacement='right'
                  className='w-full mt-auto'
                  asChild
                >
                  <a target='_blank' href='https://github.com/joao-carmassi'>
                    {cards[1].button}
                  </a>
                </Button>
              </div>
            </MagicCard>
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
};

export default GithubHomepage;
