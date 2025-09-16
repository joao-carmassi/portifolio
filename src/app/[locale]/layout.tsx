import Header from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import MessagesProvider from '@/context/messages';
import { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Portfolio | João Carmassi',
  description:
    'Professional portfolio of João Vitor Carmassi, front-end developer specialized in Next and Tailwind CSS.',
};

const navigationLinks = [
  { id: 'aboutMeHomepage', label: 'About' },
  { id: 'documentosHomepage', label: 'Resume', position: 'start' as const },
  { id: 'techStack', label: 'Stack' },
  { id: 'githubHomepage', label: 'Github' },
];

const locales = ['en', 'pt'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const RootLayout = async ({ children, params }: Props) => {
  const { locale } = await params;

  return (
    <MessagesProvider locale={locale}>
      <ThemeProvider attribute='class' defaultTheme='white' enableSystem>
        <Header navigationLinks={navigationLinks} />
      </ThemeProvider>
      {children}
    </MessagesProvider>
  );
};

export default RootLayout;
