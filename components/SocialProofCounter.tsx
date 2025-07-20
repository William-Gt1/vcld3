import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SocialProofCounterProps {
  className?: string;
}

export function SocialProofCounter({ className }: SocialProofCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/waitlist-count');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch count');
        }

        setCount(data.count);
        setError(false);
      } catch (err) {
        console.error('Error fetching waitlist count:', err);
        setError(true);
      }
    };

    fetchCount();

    // Refresh count every 5 minutes
    const interval = setInterval(fetchCount, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (error || count === null) {
    return (
      <p className={cn('text-lg text-gray-600', className)}>
        Join hundreds of builders on the waitlist
      </p>
    );
  }

  return (
    <p className={cn('text-lg text-gray-600', className)}>
      Join{' '}
      <span className="font-semibold text-primary-600 transition-all">
        {count.toLocaleString()}
      </span>{' '}
      builders already on the waitlist
    </p>
  );
} 