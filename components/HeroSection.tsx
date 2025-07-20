'use client';

import { WaitlistForm } from './WaitlistForm';
import { SocialProofCounter } from './SocialProofCounter';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Left Column - Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Ship Your MVP in{' '}
                <span className="text-primary">30 Days</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 sm:text-xl">
                Learn the art of rapid development with our intensive Vibe Coding methodology. Transform your ideas into working products using modern frameworks, proven patterns, and developer productivity hacks.
              </p>

              {/* Social Proof */}
              <div className="mt-8 flex items-center gap-4">
                <SocialProofCounter />
                <span className="text-sm text-gray-500">builders already on the waitlist</span>
              </div>

              {/* Features List */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature.title} className="feature-card">
                    <div className="feature-icon">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:mt-0">
              <div className="overflow-hidden rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-900/5">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: 'Modern Stack',
    description: 'Build with Next.js 14, React Server Components, and the latest web technologies.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Rapid Development',
    description: 'Learn proven techniques to build and ship features faster than ever.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Production Ready',
    description: 'Deploy scalable, maintainable applications with confidence and best practices.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Community Driven',
    description: 'Join a community of builders and get support throughout your journey.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
]; 