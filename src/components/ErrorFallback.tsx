
import React from 'react';
import { Button } from "@/components/ui/button";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-4">
          We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4 text-left">
          <p className="text-sm text-gray-700 font-mono">
            {error.message}
          </p>
        </div>
        <div className="space-x-4">
          <Button onClick={resetErrorBoundary} variant="default">
            Try Again
          </Button>
          <Button onClick={() => window.location.reload()} variant="outline">
            Refresh Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
