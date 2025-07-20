import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Custom render function that includes common providers/context
function render(ui: React.ReactElement, options = {}) {
  return {
    user: userEvent.setup(),
    ...rtlRender(ui, {
      wrapper: ({ children }) => children,
      ...options,
    }),
  };
}

// Test data
export const mockFormData = {
  validSubmission: {
    name: 'John Doe',
    email: 'john@example.com',
    subscribed_to_newsletter: false,
  },
  duplicateEmail: {
    name: 'Jane Doe',
    email: 'duplicate@example.com',
    subscribed_to_newsletter: true,
  },
  rateLimited: {
    name: 'Rate Limited',
    email: 'ratelimited@example.com',
    subscribed_to_newsletter: false,
  },
  invalidData: {
    name: 'A', // Too short
    email: 'invalid-email', // Invalid format
    subscribed_to_newsletter: false,
  },
};

export * from '@testing-library/react';
export { render, userEvent }; 