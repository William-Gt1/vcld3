import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { defaultSEO, courseSchema, organizationSchema } from '@/lib/seo';
import './globals.css';

// Font configuration
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://vibecoding.com'), // Replace with actual URL
  title: {
    default: defaultSEO.title,
    template: '%s | Vibe Coding Course',
  },
  description: defaultSEO.description,
  keywords: [
    'coding course',
    'MVP development',
    'rapid development',
    'web development',
    'Next.js',
    'React',
    'full-stack',
  ],
  authors: [{ name: 'Vibe Coding Team' }],
  creator: 'Vibe Coding Team',
  openGraph: {
    ...defaultSEO.openGraph,
    images: [{
      url: defaultSEO.openGraph.images[0].url,
      width: defaultSEO.openGraph.images[0].width,
      height: defaultSEO.openGraph.images[0].height,
      alt: defaultSEO.openGraph.images[0].alt,
    }],
  },
  twitter: {
    ...defaultSEO.twitter,
    title: defaultSEO.title,
    description: defaultSEO.description,
  },
  alternates: {
    canonical: defaultSEO.canonical,
  },
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
};

// Structured data for the page
const structuredData = {
  __html: JSON.stringify([courseSchema, organizationSchema]),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={inter.variable}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={structuredData}
        />
      </head>
      <body className="min-h-screen bg-white font-sans antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-50 -translate-y-[150%] rounded-md bg-primary-600 px-4 py-2 text-sm text-white transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
