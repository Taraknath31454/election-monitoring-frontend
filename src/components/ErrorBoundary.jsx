import React from 'react';

/**
 * ErrorBoundary Component
 * Catches JavaScript errors in the component tree
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          errorInfo: this.state.errorInfo,
          resetError: this.handleRetry
        });
      }

      // Default fallback UI
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * ErrorFallback Component
 * Default error display UI
 */
function ErrorFallback({ error, errorInfo, onRetry }) {
  const appName = import.meta.env.VITE_APP_NAME || 'Election Monitoring System';
  const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0';

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
        {/* Error Icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-red-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>

        {/* Error Title */}
        <h1 className="text-2xl font-bold text-white mb-2">
          Something Went Wrong
        </h1>

        {/* Error Message */}
        <p className="text-gray-400 mb-6">
          We're sorry, but something unexpected happened. Please try again.
        </p>

        {/* Error Details (development only) */}
        {process.env.NODE_ENV === 'development' && error && (
          <div className="mb-6 text-left">
            <button
              onClick={() => {
                const details = document.getElementById('error-details');
                if (details) {
                  details.classList.toggle('hidden');
                }
              }}
              className="text-sm text-blue-400 hover:text-blue-300 mb-2"
            >
              Show Error Details
            </button>
            <pre 
              id="error-details" 
              className="hidden bg-gray-900 p-3 rounded-lg text-xs text-red-400 overflow-auto max-h-32"
            >
              {error.toString()}
              {errorInfo?.componentStack}
            </pre>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium rounded-lg transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
          >
            Go Home
          </button>
        </div>

        {/* App Info */}
        <div className="mt-8 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-500">
            {appName} v{appVersion}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * AsyncErrorBoundary Component
 * Wrapper for handling async errors
 */
function withErrorBoundary(WrappedComponent, errorBoundaryProps) {
  return function WithErrorBoundary(props) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

export { ErrorFallback, withErrorBoundary };
export default ErrorBoundary;
