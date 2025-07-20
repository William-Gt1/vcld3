import type { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { defaultSEO } from '@/lib/seo';

export const metadata: Metadata = {
  title: defaultSEO.title,
  description: defaultSEO.description,
  openGraph: {
    type: 'website',
    locale: defaultSEO.openGraph.locale,
    url: defaultSEO.openGraph.url,
    title: defaultSEO.openGraph.title,
    description: defaultSEO.openGraph.description,
    siteName: defaultSEO.openGraph.siteName,
    images: [{
      url: defaultSEO.openGraph.images[0].url,
      width: defaultSEO.openGraph.images[0].width,
      height: defaultSEO.openGraph.images[0].height,
      alt: defaultSEO.openGraph.images[0].alt,
    }],
  },
  twitter: defaultSEO.twitter,
};

export default function Home() {
  return (
    <>
      <header className="sr-only" aria-label="Page header">
        <h1>Vibe Coding Course - Ship Your MVP in 30 Days</h1>
      </header>

      <HeroSection />

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <li>
                <a
                  href="#"
                  className="hover:text-primary-600 focus-visible:text-primary-600 transition-colors focus:outline-none focus-visible:underline"
                >
                  Privacy Policy
                </a>
          </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-600 focus-visible:text-primary-600 transition-colors focus:outline-none focus-visible:underline"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@vibecoding.com"
                  className="hover:text-primary-600 focus-visible:text-primary-600 transition-colors focus:outline-none focus-visible:underline"
                >
                  Contact Us
                </a>
              </li>
            </ul>
            <p className="mt-8 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Vibe Coding. All rights reserved.
            </p>
          </nav>
        </div>
      </footer>
    </>
  );
}
