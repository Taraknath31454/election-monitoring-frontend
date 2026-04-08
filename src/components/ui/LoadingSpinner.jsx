/**
 * LoadingSpinner Component
 * Displays a loading animation
 * @param {string} size - Size of the spinner (sm, md, lg)
 * @param {string} color - Color theme (amber, blue, white)
 * @param {string} text - Optional text to display below the spinner
 * @param {boolean} fullScreen - Whether to display as full screen overlay
 */
function LoadingSpinner({ 
  size = 'md', 
  color = 'amber',
  text,
  fullScreen = false
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    amber: 'text-amber-500',
    blue: 'text-blue-500',
    white: 'text-white',
    gray: 'text-gray-400'
  };

  const spinnerClasses = `${sizeClasses[size]} ${colorClasses[color]} animate-spin`;

  const content = (
    <div className="flex flex-col items-center justify-center">
      <svg 
        className={spinnerClasses} 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <p className={`mt-3 text-sm ${colorClasses[color]}`}>{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}

/**
 * LoadingOverlay Component
 * Displays a loading overlay on top of content
 */
function LoadingOverlay({ isLoading, children }) {
  if (!isLoading) return children;

  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-10">
        <LoadingSpinner size="lg" />
      </div>
    </div>
  );
}

export { LoadingOverlay };
export default LoadingSpinner;
