import { Raleway } from 'next/font/google';
import './globals.css';

const raleway = Raleway({
  variable: '--font-main',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${raleway.variable} font-main antialiased`}>
        {children}
      </body>
    </html>
  );
}
