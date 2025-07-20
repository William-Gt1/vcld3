'use client';

import { useWaitlistForm } from '@/lib/hooks/useWaitlistForm';
import {
  Button,
  Input,
  Checkbox,
  ErrorMessage,
  SuccessMessage,
} from '@/components/ui';

export function WaitlistForm() {
  const {
    formData,
    errors,
    isSubmitting,
    submitError,
    isSuccess,
    handleChange,
    handleSubmit,
  } = useWaitlistForm();

  if (isSuccess) {
    return (
      <div className="space-y-4">
        <SuccessMessage message="Thanks for joining the waitlist! We'll be in touch soon." />
        <p className="text-sm text-gray-600">
          {formData.subscribed_to_newsletter &&
            "You're all set to receive our newsletter updates."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-6"
      noValidate
    >
      <Input
        label="Full Name"
        id="name"
        name="name"
        type="text"
        placeholder="Your full name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        required
        autoComplete="name"
        disabled={isSubmitting}
      />

      <Input
        label="Email Address"
        id="email"
        name="email"
        type="email"
        placeholder="your@email.com"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
        required
        autoComplete="email"
        disabled={isSubmitting}
      />

      <Checkbox
        label="Subscribe to course updates, product releases, and our newsletter"
        id="newsletter"
        name="newsletter"
        checked={formData.subscribed_to_newsletter}
        onChange={(e) =>
          handleChange('subscribed_to_newsletter', e.target.checked)
        }
        disabled={isSubmitting}
      />

      {submitError && <ErrorMessage message={submitError} />}

      <Button
        type="submit"
        isLoading={isSubmitting}
        loadingText="Joining waitlist..."
        className="w-full"
      >
        Join the Waitlist
      </Button>
    </form>
  );
} 