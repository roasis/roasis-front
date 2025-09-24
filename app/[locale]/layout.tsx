import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/src/components/ui/Header';
import WalletModal from '@/src/components/wallet/WalletModal';
import ModalProvider from '@/src/provider/ModalProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'roasis - XRPL 조각투자 플랫폼',
    template: '%s | roasis',
  },
  description:
    'XRPL을 이용한 혁신적인 조각투자 플랫폼. 예술작품을 작은 조각으로 나누어 투자하고, 블록체인 기술로 안전하게 거래하세요.',
  keywords: [
    'XRPL',
    '조각투자',
    '블록체인',
    '예술투자',
    '암호화폐',
    '디지털자산',
    'NFT',
    'fractional investment',
    'art investment',
  ],
  authors: [{ name: 'roasis team' }],
  creator: 'roasis',
  publisher: 'roasis',
  applicationName: 'roasis',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: ['en_US'],
    url: 'https://roasis.com',
    siteName: 'roasis',
    title: 'roasis - XRPL 조각투자 플랫폼',
    description:
      'XRPL을 이용한 혁신적인 조각투자 플랫폼. 예술작품을 작은 조각으로 나누어 투자하고, 블록체인 기술로 안전하게 거래하세요.',
    images: [
      {
        url: '/roasis.png',
        width: 1200,
        height: 630,
        alt: 'roasis - XRPL 조각투자 플랫폼',
      },
      {
        url: '/Rectangle-home.png',
        width: 800,
        height: 600,
        alt: 'roasis 플랫폼 스크린샷',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@roasis',
    creator: '@roasis',
    title: 'roasis - XRPL 조각투자 플랫폼',
    description:
      'XRPL을 이용한 혁신적인 조각투자 플랫폼. 예술작품을 작은 조각으로 나누어 투자하세요.',
    images: ['/roasis.png'],
  },

  // Viewport
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: '/roasis.png' },
      { url: '/roasis.png', sizes: '16x16', type: 'image/png' },
      { url: '/roasis.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/roasis.png', sizes: '180x180', type: 'image/png' }],
  },

  // Additional meta tags
  other: {
    'theme-color': '#000000',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'msapplication-TileColor': '#000000',
    'msapplication-TileImage': '/roasis.png',
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href={`https://roasis.com/${locale}`} />

        {/* Alternate language versions */}
        <link rel="alternate" hrefLang="ko" href="https://roasis.com/ko" />
        <link rel="alternate" hrefLang="en" href="https://roasis.com/en" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://roasis.com/ko"
        />

        {/* Preload important resources */}
        <link rel="preload" href="/roasis.png" as="image" />

        {/* Additional structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'roasis',
              description:
                locale === 'ko'
                  ? 'XRPL을 이용한 혁신적인 조각투자 플랫폼'
                  : 'Innovative fractional investment platform using XRPL',
              url: 'https://roasis.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate:
                    'https://roasis.com/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ModalProvider>
            <Header />
            {children}
            <WalletModal />
          </ModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
