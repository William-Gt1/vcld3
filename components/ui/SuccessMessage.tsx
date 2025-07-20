import { cn } from '@/lib/utils';

interface SuccessMessageProps {
  message: string;
  className?: string;
}

export function SuccessMessage({ message, className }: SuccessMessageProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        'rounded-md bg-green-50 p-4 text-sm text-green-500',
        className
      )}
      role="alert"
    >
      <div className="flex">
        <svg
          className="h-5 w-5 text-green-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
        <span className="ml-2">{message}</span>
      </div>
    </div>
  );
} 