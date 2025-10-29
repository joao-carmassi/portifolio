import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta
          name='google-site-verification'
          content='fROZF15LJteQ084SiUI76J86k51o7lG2n3bzHfCh69Y'
        />
      </head>
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
      {children}
    </html>
  );
}
