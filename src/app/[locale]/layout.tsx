import Header from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import MessagesProvider from '@/context/messages';
import { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import Script from 'next/script';
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
      <head>
        <meta
          name='google-site-verification'
          content='fROZF15LJteQ084SiUI76J86k51o7lG2n3bzHfCh69Y'
        />
      </head>
      <body className={`${raleway.variable} font-main antialiased`}>
        {/* Google Analytics */}
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-ZPXTYH8YVL'
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZPXTYH8YVL');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id='google-tag-manager' strategy='afterInteractive'>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N2GFFDFJ');
          `}
        </Script>

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-N2GFFDFJ'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

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
