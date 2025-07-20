'use client';

import { useState } from 'react';
import { waitlistFormSchema } from '@/lib/validation';
import type { WaitlistFormData } from '@/lib/validation';
import { z } from 'zod';

export function useWaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof WaitlistFormData, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (data: WaitlistFormData) => {
    try {
      waitlistFormSchema.parse(data);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof WaitlistFormData] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (formData: WaitlistFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setErrors({});

    if (!validateForm(formData)) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist. Please try again.');
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const register = (name: keyof WaitlistFormData) => ({
    name,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setErrors((prev) => ({ ...prev, [name]: undefined }));
      return value;
    },
  });

  return {
    register,
    handleSubmit,
    isSubmitting,
    isSubmitted,
    errors,
    submitError,
  };
} 