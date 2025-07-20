import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toHaveClass(className: string): R;
      toHaveStyle(style: Record<string, any>): R;
    }
  }
} 