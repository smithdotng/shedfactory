import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Digital Creative Agency & Product Studio`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ['/assets/images/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/assets/images/og-image.jpg'] },
  icons: {
    icon: [
      { url: '/assets/images/favicons/favicon-32x32.png', sizes: '32x32' },
      { url: '/assets/images/favicons/favicon-16x16.png', sizes: '16x16' },
    ],
    apple: '/assets/images/favicons/apple-touch-icon.png',
  },
  manifest: '/assets/images/favicons/site.webmanifest',
};

export const viewport: Viewport = { themeColor: '#0e0d0c' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
