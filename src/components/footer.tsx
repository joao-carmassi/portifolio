'use client';

import { useMessages } from '@/context/messages';
import scrollToContainer from '@/utils/scrowToContainer';
import { ArrowUpRight } from 'lucide-react';

interface Props {
  navigationLinks: {
    id: string;
    label: string;
    position: 'start' | 'center' | 'end';
  }[];
  actions: { contact: string };
}

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

const Footer = ({ navigationLinks, actions }: Props) => {
  const t = useMessages('footer');
  const { labels, text } = t('texts');

  return (
    <section>
      <div className='p-6 md:p-12'>
        <div className='bg-card shadow-lg inset-shadow-2xs rounded-lg p-8 md:p-16'>
          <div className='border-border mb-6 border-b pb-6 text-left md:mb-8 md:pb-8 md:text-center'>
            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl'>
              {footerData.heading}
            </h1>
          </div>

          <div className='mb-12 flex flex-col gap-8 md:mb-16 lg:flex-row lg:justify-between lg:gap-4 xl:gap-8'>
            {/* Email Section */}
            <div className='flex flex-col items-start gap-4'>
              <h3 className='text-primary text-sm font-medium uppercase tracking-wide'>
                Email
              </h3>
              <a
                href={footerData.email.href}
                className='text-muted-foreground hover:text-primary flex items-center gap-2 text-base transition-colors md:text-lg'
              >
                {footerData.email.label}
                <ArrowUpRight className='h-4 w-4' />
              </a>
            </div>

            {/* Social Links Section */}
            <div className='flex flex-col items-start gap-4'>
              <h3 className='text-primary text-sm font-medium uppercase tracking-wide'>
                {labels && labels[0]}
              </h3>
              <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
                {footerData.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className='text-muted-foreground hover:text-primary text-base transition-colors md:text-lg text-center'
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Phone Section */}
            <div className='flex flex-col items-start gap-4'>
              <h3 className='text-primary text-sm font-medium uppercase tracking-wide'>
                {labels && labels[1]}
              </h3>
              <a
                href={footerData.phone.href}
                className='text-muted-foreground hover:text-primary flex items-center gap-2 text-base transition-colors md:text-lg'
              >
                {footerData.phone.label}
                <ArrowUpRight className='h-4 w-4' />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between md:py-4'>
          <nav className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6'>
            {navigationLinks.map((link) => (
              <button
                key={link.label}
                onClick={() =>
                  scrollToContainer(link.id, link.position || 'center')
                }
                className='text-muted-foreground hover:text-primary text-sm transition-colors'
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToContainer('contactMeHomepage', 'center')}
              className='text-muted-foreground hover:text-primary text-sm transition-colors'
            >
              {actions.contact || ''}
            </button>
          </nav>

          <div className='text-muted-foreground text-sm md:text-right md:text-xs'>
            {text} <strong>João Carmassi</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Footer as Footer24 };
