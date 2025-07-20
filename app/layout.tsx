import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vibe Coding Course - Ship Your MVP in 30 Days',
  description:
    'Learn the art of rapid development with our intensive Vibe Coding methodology. Transform your ideas into working products using modern frameworks, proven patterns, and developer productivity hacks.',
  openGraph: {
    title: 'Vibe Coding Course - Ship Your MVP in 30 Days',
    description:
      'Learn the art of rapid development with our intensive Vibe Coding methodology. Transform your ideas into working products using modern frameworks, proven patterns, and developer productivity hacks.',
    url: 'https://vibecoding.dev',
    siteName: 'Vibe Coding',
    images: [
      {
        url: 'https://vibecoding.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vibe Coding Course',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Coding Course - Ship Your MVP in 30 Days',
    description:
      'Learn the art of rapid development with our intensive Vibe Coding methodology. Transform your ideas into working products using modern frameworks, proven patterns, and developer productivity hacks.',
    creator: '@vibecoding',
    images: ['https://vibecoding.dev/twitter-image.png'],
  },
  metadataBase: new URL('https://vibecoding.dev'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>{children}</body>
    </html>
  );
}
