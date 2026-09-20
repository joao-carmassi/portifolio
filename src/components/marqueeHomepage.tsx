import ScrollVelocity from '@/components/scroll-velocity';

const texts = ['design e código na mesma pessoa —', 'do rascunho até o ar —'];

const MarqueeHomepage = () => (
  <div id='marqueeHomepage' className='py-6 md:py-12'>
    <ScrollVelocity
      texts={texts}
      velocity={40}
      // the scroller hardcodes font-sans and font-bold; DM Serif has one weight
      className='font-title! font-normal! text-primary'
    />
  </div>
);

export default MarqueeHomepage;
