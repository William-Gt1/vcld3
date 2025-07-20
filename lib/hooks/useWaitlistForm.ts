import { useState, useCallback } from 'react';
import { WaitlistFormData, validateField, waitlistFormSchema } from '@/lib/validation';
import { z } from 'zod';

interface UseWaitlistFormReturn {
  formData: WaitlistFormData;
  errors: Partial<Record<keyof WaitlistFormData, string>>;
  isSubmitting: boolean;
  submitError: string | null;
  isSuccess: boolean;
  handleChange: (field: keyof WaitlistFormData, value: string | boolean) => void;
  handleSubmit: () => Promise<void>;
  reset: () => void;
}

const initialFormData: WaitlistFormData = {
  name: '',
  email: '',
  subscribed_to_newsletter: false,
};

export function useWaitlistForm(): UseWaitlistFormReturn {
  const [formData, setFormData] = useState<WaitlistFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof WaitlistFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = useCallback((field: keyof WaitlistFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const error = validateField(field, value);
      return error ? { ...prev, [field]: error } : { ...prev, [field]: undefined };
    });
  }, []);

  const validateForm = useCallback((): boolean => {
    const result = waitlistFormSchema.safeParse(formData);
    if (!result.success) {
      const formErrors: Partial<Record<keyof WaitlistFormData, string>> = {};
      const formattedErrors = result.error.format();
      
      Object.keys(formData).forEach((key) => {
        const fieldKey = key as keyof WaitlistFormData;
        const fieldErrors = formattedErrors[fieldKey]?._errors;
        if (fieldErrors?.[0]) {
          formErrors[fieldKey] = fieldErrors[0];
        }
      });
      
      setErrors(formErrors);
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    setSubmitError(null);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setIsSuccess(true);
      setFormData(initialFormData);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  const reset = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitError(null);
    setIsSuccess(false);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    isSuccess,
    handleChange,
    handleSubmit,
    reset,
  };
} 