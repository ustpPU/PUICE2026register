import type { Metadata } from 'next';
import './globals.css';
import FloatingNavigation from '../components/FloatingNavigation';
import { sitePath } from '../lib/runtime-paths';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'PUiCE 2026 | Petaling Utama Innovative Conference on Education',
    template: '%s | PUiCE 2026',
  },
  description: 'Pendidikan Masa Hadapan: Teknologi Memacu, Insan Memimpin.',
  icons: { icon: sitePath('/favicon.png'), shortcut: sitePath('/favicon.png'), apple: sitePath('/favicon.png') },
  openGraph: {
    title: 'PUiCE 2026',
    description: 'Pendidikan Masa Hadapan: Teknologi Memacu, Insan Memimpin.',
    locale: 'ms_MY',
    type: 'website',
    images: [{ url: sitePath('/og.png'), width: 1200, height: 630, alt: 'PUiCE 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PUiCE 2026',
    description: 'Pendidikan Masa Hadapan: Teknologi Memacu, Insan Memimpin.',
    images: [sitePath('/og.png')],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms">
      <body>{children}<FloatingNavigation /></body>
    </html>
  );
}
