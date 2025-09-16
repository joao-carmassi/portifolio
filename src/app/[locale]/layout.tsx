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

const locales = ['en', 'pt'];

const RootLayout = async ({ children, params }: Props) => {
  const { locale } = await params;
  const t = await getMessages(locale, 'navbar');
  const links = t('links');

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${raleway.variable} font-main antialiased`}>
        <MessagesProvider locale={locale}>
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
  return locales.map((locale) => ({ locale }));
}

export default RootLayout;
