import { WaitlistForm } from './WaitlistForm';
import { SocialProofCounter } from './SocialProofCounter';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.02]">
        <svg
          className="h-full w-full"
          width="100%"
          height="100%"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="80" height="80" fill="currentColor" />
          <rect x="40" width="40" height="40" fill="currentColor" opacity="0.5" />
          <rect y="40" width="40" height="40" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center gap-12 py-16 lg:flex-row lg:py-24">
          {/* Content Column */}
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Master Vibe Coding</span>
              <span className="mt-2 block text-primary-600">
                Ship Your MVP in 30 Days
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg text-gray-600">
              Learn the art of rapid development with our intensive Vibe Coding
              methodology. Transform your ideas into working products using modern
              frameworks, proven patterns, and developer productivity hacks. Join
              hundreds of builders who've launched their MVPs in record time.
            </p>

            <div className="mt-8 w-full lg:hidden">
              <WaitlistForm />
            </div>

            <SocialProofCounter className="mt-8" />

            {/* Feature List */}
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="shrink-0 text-primary-600">{feature.icon}</div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Column */}
          <div className="hidden w-full max-w-md flex-shrink-0 lg:block">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: 'Modern Stack',
    description:
      'Build with Next.js 14, React Server Components, and the latest web technologies.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
  },
  {
    title: 'Rapid Development',
    description:
      'Learn proven techniques to build and ship features faster than ever.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: 'Production Ready',
    description:
      'Deploy scalable, maintainable applications with confidence and best practices.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Community Driven',
    description:
      'Join a community of builders and get support throughout your journey.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]; 