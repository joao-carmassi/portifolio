import Header from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import MessagesProvider from '@/context/messages';
import { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import '../globals.css';
import { getMessages } from '@/utils/getMessages';
import { ReactLenis } from 'lenis/react';
import { locales } from '../../../messages';

const raleway = Raleway({
  variable: '--font-main',
  subsets: ['latin'],
});

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMessages(locale, 'metadata');

  const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}${locale}`;

  const languages = Object.fromEntries(
    locales.map((item) => [
      item.locale,
      `${process.env.NEXT_PUBLIC_SITE_URL || ''}${item.locale}`,
    ])
  );

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    robots: 'index, follow',
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${locale}`,
      siteName: t('title'),
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

const RootLayout = async ({ children, params }: Props) => {
  const { locale } = await params;
  const t = await getMessages(locale, 'navbar');
  const links = t('links');

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${raleway.variable} font-main antialiased`}>
        <ReactLenis
          options={{
            lerp: 0.1,
          }}
          root
        >
          <MessagesProvider locale={locale} locales={locales}>
            <ThemeProvider attribute='class' defaultTheme='white' enableSystem>
              <Header navigationLinks={links} />
              {children}
            </ThemeProvider>
          </MessagesProvider>
        </ReactLenis>
      </body>
    </html>
  );
};

export function generateStaticParams() {
  return locales.map((item) => ({
    locale: item.locale,
  }));
}

export default RootLayout;
