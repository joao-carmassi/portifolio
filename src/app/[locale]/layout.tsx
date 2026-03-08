import { ThemeProvider } from '@/components/theme-provider';
import { Metadata } from 'next';
import { Raleway, DM_Serif_Display } from 'next/font/google';
import '../globals.css';
import { ReactLenis } from 'lenis/react';
import QueryProvider from '@/components/query-provider';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../../i18n/routing';
import {
  getMessages as getMessagesIntl,
  setRequestLocale,
} from 'next-intl/server';
import { IMessage } from '@/types/message';
import Header from '@/components/header';
import Footer from '@/components/footer';
import getAppBasePath from '@/lib/get-app-base-path';
import serializeJavascript from 'serialize-javascript';
import type { Graph, Person, WebSite } from 'schema-dts';

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-title',
  subsets: ['latin'],
  weight: '400',
});

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

  const pageUrl = `${getAppBasePath()}/${locale}`;

  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, `${getAppBasePath()}/${item}`]),
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

  const pageUrl = `${getAppBasePath()}/${locale}`;
  const baseUrl = getAppBasePath();

  const person: Person = {
    '@type': 'Person',
    '@id': `${baseUrl}/#person`,
    name: 'João Vitor Carmassi',
    jobTitle: messages.jsonLd.jobTitle,
    description: messages.metadata.description,
    url: pageUrl,
    email: 'joaovitorcarmassi@gmail.com',
    telephone: '+5512996661778',
    birthDate: '2004-12-08',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'São Bento do Sapucaí',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    sameAs: [
      'https://github.com/joao-carmassi',
      'https://www.linkedin.com/in/joao-carmassi/',
      'https://www.instagram.com/joao_carmassi/',
    ],
    knowsLanguage: ['pt-BR', 'en', 'es'],
  };

  const website: WebSite = {
    '@type': 'WebSite',
    name: messages.metadata.title,
    url: pageUrl,
    description: messages.metadata.description,
    inLanguage: locale,
    author: { '@id': `${baseUrl}/#person` },
  };

  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [person, website],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${raleway.variable} ${dmSerifDisplay.variable} font-main antialiased`}
      >
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: serializeJavascript(jsonLd),
          }}
        />
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
                  actions={messages.navbar.actions}
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

// TODO: New section

export default RootLayout;
