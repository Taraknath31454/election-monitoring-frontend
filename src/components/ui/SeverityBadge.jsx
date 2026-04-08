import { SEVERITY_CONFIG, REPORT_SEVERITY } from '../../constants';
import { useTranslation } from 'react-i18next';

/**
 * SeverityBadge Component
 * Displays a colored badge showing the report severity level
 * @param {string} severity - The severity value from REPORT_SEVERITY
 * @param {boolean} showIcon - Whether to show the severity icon
 * @param {boolean} compact - Whether to use compact styling
 */
function SeverityBadge({ severity, showIcon = false, compact = false }) {
  const { t } = useTranslation();
  const config = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG[REPORT_SEVERITY.LOW];

  const iconMap = {
    info: (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'alert-triangle': (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    'alert-circle': (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'alert-octagon': (
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  // Map severity keys to translation keys
  const severityKeyMap = {
    [REPORT_SEVERITY.LOW]: 'severity.low',
    [REPORT_SEVERITY.MEDIUM]: 'severity.medium',
    [REPORT_SEVERITY.HIGH]: 'severity.high',
    [REPORT_SEVERITY.CRITICAL]: 'severity.critical'
  };

  // Enhanced glassmorphism styles
  const colorStyles = {
    green: {
      bg: 'bg-green-500/15',
      text: 'text-green-400',
      border: 'border-green-500/30',
      dot: 'bg-green-400',
      glow: 'shadow-[0_0_10px_rgba(34,197,94,0.2)]'
    },
    yellow: {
      bg: 'bg-yellow-500/15',
      text: 'text-yellow-400',
      border: 'border-yellow-500/30',
      dot: 'bg-yellow-400',
      glow: 'shadow-[0_0_10px_rgba(234,179,8,0.2)]'
    },
    orange: {
      bg: 'bg-orange-500/15',
      text: 'text-orange-400',
      border: 'border-orange-500/30',
      dot: 'bg-orange-400',
      glow: 'shadow-[0_0_10px_rgba(249,115,22,0.2)]'
    },
    red: {
      bg: 'bg-red-500/15',
      text: 'text-red-400',
      border: 'border-red-500/30',
      dot: 'bg-red-400',
      glow: 'shadow-[0_0_10px_rgba(239,68,68,0.2)]'
    }
  };

  // Map config color to our colorStyles
  const colorMap = {
    low: 'green',
    medium: 'yellow',
    high: 'orange',
    critical: 'red'
  };

  const styles = colorStyles[colorMap[config.color]] || colorStyles.green;
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
      {t(severityKeyMap[severity] || 'severity.low')}
    </span>
  );
}

export default SeverityBadge;
