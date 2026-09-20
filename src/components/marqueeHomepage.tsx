import ScrollVelocity from '@/components/scroll-velocity';

const texts = [
  'sites rápidos, do rascunho até o ar —',
  'front-end, SEO e manutenção —',
];

const MarqueeHomepage = () => (
  <div
    id='marqueeHomepage'
    className='py-6 md:py-12 min-h-svh grid place-items-center shadow-md'
  >
    <ScrollVelocity
      texts={texts}
      velocity={120}
      // the scroller hardcodes font-sans and font-bold; DM Serif has one weight
      className='font-title! font-normal! text-primary'
    />
  </div>
);

export default MarqueeHomepage;
