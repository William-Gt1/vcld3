'use client';

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
              'form-checkbox',
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
        <div className="ml-3">
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn('form-label !mb-0 !inline-block', {
                'text-red-500': error,
              })}
            >
              {label}
            </label>
          )}
          {error && (
            <p
              id={`${checkboxId}-error`}
              className="form-error"
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