import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

const raleway = Raleway({
  variable: '--font-main',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portfolio | João Carmassi',
  description:
    'Professional portfolio of João Vitor Carmassi, front-end developer specialized in Next and Tailwind CSS.',
};

const navigationLinks = [
  { id: 'aboutMeHomepage', label: 'About' },
  { id: 'documentosHomepage', label: 'Resume', position: 'start' as const },
  { id: 'techStack', label: 'Stack' },
  { id: 'mapaHomepage', label: 'Map' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${raleway.variable} font-main antialiased`}>
        <Header navigationLinks={navigationLinks} />
        {children}
        <Footer navigationLinks={navigationLinks} />
      </body>
    </html>
  );
}
