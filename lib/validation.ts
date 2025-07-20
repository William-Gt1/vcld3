import { z } from 'zod';

export const waitlistFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email cannot exceed 100 characters')
    .trim()
    .toLowerCase(),
  acceptTerms: z.boolean().default(false),
});

export type WaitlistFormData = z.infer<typeof waitlistFormSchema>;

export function validateField<T extends keyof WaitlistFormData>(
  field: T,
  value: WaitlistFormData[T]
): string | null {
  const result = waitlistFormSchema.shape[field].safeParse(value);
  if (!result.success) {
    return result.error.format()._errors[0] || 'Invalid input';
  }
  return null;
} 