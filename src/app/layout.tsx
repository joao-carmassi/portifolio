import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar/navbar';
import AppProvider from '@/context/appContext';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Portfólio | João Carmassi',
  description:
    'Portfólio profissional de João Vitor Carmassi, desenvolvedor front-end especializado em Next e Tailwind CSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <AppProvider>
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </AppProvider>
    </html>
  );
}

/*TODO: 
  indexar
  curriculos
*/
