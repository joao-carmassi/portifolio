import Script from 'next/script';

export const metadata = {
  title: 'Portfolio | João Carmassi',
  description:
    'Professional portfolio of João Vitor Carmassi, front-end developer specialized in Next and Tailwind CSS.',
  keywords:
    'João Vitor Carmassi, web development, frontend development, programming, HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind, Sass, Git, Eslint, Redux, Context API, Shadcn/UI, Motion, Mobile first, Scrum, Kanban, games, music, movies, hiking, languages C1 English, B2 Spanish',
  robots: 'index, follow',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },
  openGraph: {
    title: 'Portfolio | João Carmassi',
    description:
      'Professional portfolio of João Vitor Carmassi, front-end developer specialized in Next and Tailwind CSS.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    siteName: 'Portfolio | João Carmassi',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | João Carmassi',
    description:
      'Professional portfolio of João Vitor Carmassi, front-end developer specialized in Next and Tailwind CSS.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      {/* Google Analytics */}
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
      {children}
    </html>
  );
}
