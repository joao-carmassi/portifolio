import scrollToContainer from '@/utils/scrowToContainer';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type { FooterCopy, NavCopy } from '@/i18n';

// the documents section starts below its own top edge, so it needs 'start'
// where every other section reads best centred
const scrollPosition: Record<string, 'center' | 'start' | 'end'> = {
  documentosHomepage: 'start',
};

const footerData = {
  heading: 'João Carmassi',
  email: {
    label: 'joaovitorcarmassi@gmail.com',
    href: 'mailto:joaovitorcarmassi@gmail.com',
  },
  phone: {
    label: '+55 (12) 99666-1778',
    href: 'tel:+5512996661778',
  },
  socialLinks: [
    { label: 'Instagram', href: 'https://www.instagram.com/joao_carmassi/' },
    { label: 'GitHub', href: 'https://github.com/joao-carmassi' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/joao-carmassi/' },
  ],
};

const FooterHomepage = ({
  copy,
  navCopy,
}: {
  copy: FooterCopy;
  navCopy: NavCopy;
}) => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const split = SplitText.create('.splitTextFooter', {
      type: 'words, chars',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.father-animation-footer',
        // the original used 'top 60%', but here the footer is the last element on
        // the page: it never rises that far, the trigger never fires and the
        // from() tweens leave the whole footer at opacity 0 on desktop
        start: 'top 80%',
      },
    });

    tl.from(
      '.footer-animation',
      {
        opacity: 0,
        yPercent: 100,
        ease: 'power3.out',
        stagger: 0.06,
      },
      0,
    );

    tl.from(
      split.chars,
      {
        opacity: 0,
        yPercent: -100,
        ease: 'power3.out',
        stagger: 0.06,
      },
      0,
    );

    // parallax: the name settles as the page bottoms out. The h2 left
    // .footer-animation for this, a second tween on its yPercent would fight
    // the scrub; the chars still carry its entrance
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(
      '.splitTextFooter',
      { yPercent: 60 },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.father-animation-footer',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      },
    );
  }, [copy]);

  return (
    <footer id='footerHomepage'>
      <div className='p-6 md:p-12 lg:px-24'>
        <div className='bg-card shadow-lg inset-shadow-2xs rounded-2xl p-8 md:p-16 father-animation-footer'>
          <div className='border-border mb-6 border-b pb-6 text-left md:mb-12 md:pb-12 md:text-center'>
            <h2 className='text-4xl font-bold font-title tracking-tight sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl splitTextFooter'>
              {footerData.heading}
            </h2>
          </div>

          <div className='mb-12 flex flex-col gap-8 md:mb-16 lg:flex-row lg:justify-between lg:gap-4 xl:gap-8'>
            {/* Email Section */}
            <div className='flex flex-col items-start gap-4'>
              <h3 className='text-primary text-sm font-medium uppercase tracking-wide footer-animation'>
                {copy.labels.email}
              </h3>
              <a
                href={footerData.email.href}
                className='text-muted-foreground hover:text-primary flex items-center gap-2 text-base transition-colors md:text-lg footer-animation'
              >
                {footerData.email.label}
                <ArrowUpRight className='h-4 w-4' />
              </a>
            </div>

            {/* Social Links Section */}
            <div className='flex flex-col items-start gap-4'>
              <h3 className='text-primary text-sm font-medium uppercase tracking-wide footer-animation'>
                {copy.labels.social}
              </h3>
              <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
                {footerData.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className='text-muted-foreground hover:text-primary text-base transition-colors md:text-lg text-center footer-animation'
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Phone Section */}
            <div className='flex flex-col items-start gap-4'>
              <h3 className='text-primary text-sm font-medium uppercase tracking-wide footer-animation'>
                {copy.labels.phone}
              </h3>
              <a
                href={footerData.phone.href}
                className='text-muted-foreground hover:text-primary flex items-center gap-2 text-base transition-colors md:text-lg footer-animation'
              >
                {footerData.phone.label}
                <ArrowUpRight className='h-4 w-4' />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:py-4'>
          <nav className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6'>
            {Object.values(navCopy.links).map((link) => {
              const id = link.href.slice(1);

              return (
                <button
                  key={id}
                  onClick={() =>
                    scrollToContainer(id, scrollPosition[id] ?? 'center')
                  }
                  className='text-muted-foreground hover:text-primary text-sm transition-colors footer-animation'
                >
                  {link.label}
                </button>
              );
            })}
            {/* footer only: the hero nav stays about the page's own sections */}
            <a
              href='/components/'
              // a <button> centres its label on its own, a link needs telling;
              // without it the grid cell left-aligns this one on mobile
              className='text-center text-muted-foreground hover:text-primary text-sm transition-colors footer-animation'
            >
              Prisma UI
            </a>
          </nav>

          <div className='text-muted-foreground text-center text-sm lg:text-right lg:text-xs footer-animation'>
            {copy.developedBy} <strong>João Carmassi</strong>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterHomepage;
