import { ThemeProvider } from '@/components/theme-provider';
import { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import '../globals.css';
import { ReactLenis } from 'lenis/react';
import QueryProvider from '@/components/queryProvider';
import { hasLocale, NextIntlClientProvider, useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../../i18n/routing';
import {
  getMessages as getMessagesIntl,
  setRequestLocale,
} from 'next-intl/server';
import { IMessage } from '@/types/message';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Script from 'next/script';

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
  const messages = (await getMessagesIntl()) as IMessage;
  const metadata = messages.metadata;

  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}${locale}`;

  const languages = Object.fromEntries(
    routing.locales.map((item) => [
      item,
      `${process.env.NEXT_PUBLIC_SITE_URL || ''}${item}`,
    ]),
  );

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    robots: 'index, follow',
    alternates: {
      canonical: pageUrl,
      languages,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: pageUrl,
      siteName: metadata.title,
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
    },
  };
}

const RootLayout = async ({ children, params }: Props) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await getMessagesIntl()) as IMessage;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-ZPXTYH8YVL'
        />
        <Script id='google-analytics'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZPXTYH8YVL');
          `}
        </Script>
        {/* Google Tag Manager */}
        <Script id='google-tag-manager'>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N2GFFDFJ');
          `}
        </Script>
      </head>
      <body className={`${raleway.variable} font-main antialiased`}>
        <ReactLenis
          options={{
            lerp: 0.1,
          }}
          root
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            <ThemeProvider attribute='class' defaultTheme='white' enableSystem>
              <QueryProvider>
                <Header {...messages.navbar} />
                {children}
                <Footer
                  {...messages.footer}
                  navigationLinks={messages.navbar.links}
                />
              </QueryProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </ReactLenis>
      </body>
    </html>
  );
};

export const dynamic = 'force-static';

export function generateStaticParams() {
  return routing.locales.map((item) => ({
    locale: item,
  }));
}

export default RootLayout;
