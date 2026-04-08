import { useTheme } from '../../context/ThemeContext';

/**
 * LoadingSkeleton Component
 * A reusable skeleton loader for loading states
 * Features: Animated shimmer effect, dark/light mode support
 * @param {string} className - Additional CSS classes
 * @param {string} variant - Shape variant (text, circular, rectangular, card)
 * @param {number} width - Width of skeleton
 * @param {number} height - Height of skeleton
 */
function LoadingSkeleton({ 
  className = '', 
  variant = 'text',
  width,
  height 
}) {
  const { isDark } = useTheme();

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-2xl',
  };

  const defaultHeights = {
    text: '1rem',
    circular: '3rem',
    rectangular: '2rem',
    card: '200px',
  };

  const baseClasses = `
    animate-pulse 
    ${variantClasses[variant]}
    ${className}
  `;

  const style = {
    width: width || '100%',
    height: height || defaultHeights[variant],
    background: isDark 
      ? 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)'
      : 'linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.06) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  };

  return (
    <div 
      className={baseClasses}
      style={style}
    />
  );
}

/**
 * CardSkeleton - Skeleton loader for cards
 */
export function CardSkeleton() {
  const { isDark } = useTheme();
  
  return (
    <div className={`
      rounded-2xl p-6 
      ${isDark ? 'bg-gray-800/40' : 'bg-white/60'}
      border ${isDark ? 'border-white/10' : 'border-black/10'}
      backdrop-blur-xl
    `}>
      <div className="flex items-center gap-4 mb-4">
        <LoadingSkeleton variant="circular" width="3rem" height="3rem" />
        <div className="flex-1">
          <LoadingSkeleton width="60%" height="1rem" className="mb-2" />
          <LoadingSkeleton width="40%" height="0.75rem" />
        </div>
      </div>
      <LoadingSkeleton height="4rem" className="mb-4" />
      <LoadingSkeleton width="30%" height="2rem" />
    </div>
  );
}

/**
 * TableRowSkeleton - Skeleton loader for table rows
 */
export function TableRowSkeleton({ columns = 5 }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <LoadingSkeleton height="1rem" />
        </td>
      ))}
    </tr>
  );
}

/**
 * StatCardSkeleton - Skeleton loader for stat cards
 */
export function StatCardSkeleton() {
  return (
    <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <LoadingSkeleton variant="circular" width="3rem" height="3rem" />
        <LoadingSkeleton width="3rem" height="1.5rem" />
      </div>
      <LoadingSkeleton width="50%" height="2rem" className="mb-2" />
      <LoadingSkeleton width="70%" height="0.875rem" />
    </div>
  );
}

export default LoadingSkeleton;
