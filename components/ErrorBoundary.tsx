import React from 'react';
import { Button } from '@/components/ui';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Oops! Something went wrong
          </h2>
          <p className="mb-8 max-w-md text-gray-600">
            We apologize for the inconvenience. Please try refreshing the page or
            contact support if the problem persists.
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
            >
              Refresh Page
            </Button>
            <Button
              onClick={() => this.setState({ hasError: false, error: null })}
              variant="outline"
            >
              Try Again
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <pre className="mt-8 max-w-full overflow-x-auto rounded-md bg-gray-100 p-4 text-left text-sm text-gray-800">
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
} 