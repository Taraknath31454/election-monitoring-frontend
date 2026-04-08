import { STATUS_CONFIG, REPORT_STATUS } from '../../constants';
import { useTranslation } from 'react-i18next';

/**
 * StatusBadge Component
 * Displays a colored badge showing the report status
 * @param {string} status - The status value from REPORT_STATUS
 * @param {boolean} showIcon - Whether to show the status icon
 * @param {boolean} compact - Whether to use compact styling
 */
function StatusBadge({ status, showIcon = false, compact = false }) {
  const { t } = useTranslation();
  const config = STATUS_CONFIG[status] || STATUS_CONFIG[REPORT_STATUS.PENDING];

  const iconMap = {
    clock: (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    eye: (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    'check-circle': (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'x-circle': (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  // Map status keys to translation keys
  const statusKeyMap = {
    [REPORT_STATUS.PENDING]: 'status.pending',
    [REPORT_STATUS.UNDER_REVIEW]: 'status.inReview',
    [REPORT_STATUS.RESOLVED]: 'status.resolved',
    [REPORT_STATUS.REJECTED]: 'status.rejected'
  };

  // Enhanced glassmorphism styles
  const colorStyles = {
    amber: {
      bg: 'bg-primary-500/15',
      text: 'text-primary-400',
      border: 'border-primary-500/30',
      dot: 'bg-primary-400',
      glow: 'shadow-[0_0_10px_rgba(245,158,11,0.2)]'
    },
    blue: {
      bg: 'bg-accent-500/15',
      text: 'text-accent-400',
      border: 'border-accent-500/30',
      dot: 'bg-accent-400',
      glow: 'shadow-[0_0_10px_rgba(99,102,241,0.2)]'
    },
    green: {
      bg: 'bg-green-500/15',
      text: 'text-green-400',
      border: 'border-green-500/30',
      dot: 'bg-green-400',
      glow: 'shadow-[0_0_10px_rgba(34,197,94,0.2)]'
    },
    red: {
      bg: 'bg-red-500/15',
      text: 'text-red-400',
      border: 'border-red-500/30',
      dot: 'bg-red-400',
      glow: 'shadow-[0_0_10px_rgba(239,68,68,0.2)]'
    }
  };

  const styles = colorStyles[config.color] || colorStyles.amber;
  const baseClasses = compact ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full 
      ${baseClasses} 
      ${styles.bg} ${styles.text} 
      border ${styles.border}
      backdrop-blur-sm
      transition-all duration-200
      hover:scale-105
      ${styles.glow}
    `}>
      {showIcon && iconMap[config.icon]}
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot} mr-1.5`} />
      {t(statusKeyMap[status] || 'status.pending')}
    </span>
  );
}

export default StatusBadge;
