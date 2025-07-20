export const siteConfig = {
  name: 'Vibe Coding Course',
  description:
    'Join hundreds of builders learning rapid development. Transform ideas into working products with our proven Vibe Coding methodology. Waitlist open now.',
  url: 'https://vibecoding.com', // Replace with actual URL
  ogImage: '/og-image.jpg', // Replace with actual OG image
  links: {
    twitter: 'https://twitter.com/vibecoding',
    github: 'https://github.com/vibecoding',
  },
} as const;

export const defaultSEO = {
  title: 'Vibe Coding Course - Ship Your MVP in 30 Days',
  description: siteConfig.description,
  canonical: siteConfig.url,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: 'Vibe Coding Course - Ship Your MVP in 30 Days',
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: 'Vibe Coding Course',
      },
    ],
  },
  twitter: {
    handle: '@vibecoding',
    site: '@vibecoding',
    cardType: 'summary_large_image',
  },
} as const;

export const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Vibe Coding Course',
  description: siteConfig.description,
  provider: {
    '@type': 'Organization',
    name: siteConfig.name,
    sameAs: [siteConfig.links.twitter, siteConfig.links.github],
  },
  educationalLevel: 'Intermediate',
  courseCode: 'VCC-001',
  timeRequired: 'P30D',
  teaches: [
    'Rapid MVP Development',
    'Modern Web Development',
    'Next.js 14',
    'React Server Components',
    'Full-Stack Development',
  ],
} as const;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`, // Replace with actual logo URL
  sameAs: [siteConfig.links.twitter, siteConfig.links.github],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@vibecoding.com', // Replace with actual email
    contactType: 'customer service',
  },
} as const; 