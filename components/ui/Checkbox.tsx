import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              'h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              {
                'border-red-500 focus:ring-red-500': error,
              },
              className
            )}
            aria-describedby={error ? `${checkboxId}-error` : undefined}
            aria-invalid={!!error}
            {...props}
          />
        </div>
        <div className="ml-2">
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn('text-sm font-medium text-gray-900', {
                'text-red-500': error,
              })}
            >
              {label}
            </label>
          )}
          {error && (
            <p
              id={`${checkboxId}-error`}
              className="mt-1 text-sm text-red-500"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox'; 