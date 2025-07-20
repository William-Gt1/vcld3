'use client';

import { FormEvent } from 'react';
import { useWaitlistForm } from '@/lib/hooks/useWaitlistForm';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Checkbox } from './ui/Checkbox';
import { ErrorMessage } from './ui/ErrorMessage';
import { SuccessMessage } from './ui/SuccessMessage';

export function WaitlistForm() {
  const {
    register,
    handleSubmit: submitForm,
    isSubmitting,
    isSubmitted,
    errors,
    submitError,
  } = useWaitlistForm();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await submitForm({
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      acceptTerms: formData.get('acceptTerms') === 'on',
    });
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <SuccessMessage
          message="You've been added to the waitlist! We'll notify you when we launch."
          className="mb-6"
        />
        <p className="text-sm text-gray-600">
          Follow us on{' '}
          <a
            href="https://twitter.com/vibecoding"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:text-primary-dark"
          >
            Twitter
          </a>{' '}
          for updates.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Join the Waitlist</h2>
        <p className="mt-2 text-sm text-gray-600">
          Be the first to know when we launch and get exclusive early access.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          {...register('fullName')}
          label="Full Name"
          placeholder="John Doe"
          error={errors.fullName}
        />

        <Input
          {...register('email')}
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          error={errors.email}
        />

        <Checkbox
          {...register('acceptTerms')}
          label="I agree to receive updates about the course"
          error={errors.acceptTerms}
        />

        {submitError && (
          <ErrorMessage message={submitError} className="mt-4" />
        )}

        <Button
          type="submit"
          className="w-full"
          isLoading={isSubmitting}
          loadingText="Joining..."
        >
          Join Now
        </Button>
      </form>
    </div>
  );
} 