import Header from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import MessagesProvider from '@/context/messages';
import { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import '../globals.css';
import { getMessages } from '@/utils/getMessages';

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

  return {
    title: t('title'),
    description: t('description'),
  };
}

export const locales = [
  { locale: 'en', name: 'English' },
  { locale: 'pt', name: 'Portugues' },
  { locale: 'es', name: 'Español' },
];

const RootLayout = async ({ children, params }: Props) => {
  const { locale } = await params;
  const t = await getMessages(locale, 'navbar');
  const links = t('links');

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${raleway.variable} font-main antialiased`}>
        <MessagesProvider locale={locale} locales={locales}>
          <ThemeProvider attribute='class' defaultTheme='white' enableSystem>
            <Header navigationLinks={links} />
          </ThemeProvider>
          {children}
        </MessagesProvider>
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
