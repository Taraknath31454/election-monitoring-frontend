/**
 * Report Severity Constants for the Election Monitoring System
 * Using enums instead of hardcoded strings
 */

export const REPORT_SEVERITY = Object.freeze({
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical'
});

export const SEVERITY_CONFIG = Object.freeze({
  [REPORT_SEVERITY.LOW]: {
    label: 'Low',
    color: 'green',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
    borderColor: 'border-green-500/20',
    priority: 1,
    icon: 'info'
  },
  [REPORT_SEVERITY.MEDIUM]: {
    label: 'Medium',
    color: 'yellow',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-500',
    borderColor: 'border-yellow-500/20',
    priority: 2,
    icon: 'alert-triangle'
  },
  [REPORT_SEVERITY.HIGH]: {
    label: 'High',
    color: 'orange',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-500',
    borderColor: 'border-orange-500/20',
    priority: 3,
    icon: 'alert-circle'
  },
  [REPORT_SEVERITY.CRITICAL]: {
    label: 'Critical',
    color: 'red',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-500',
    borderColor: 'border-red-500/20',
    priority: 4,
    icon: 'alert-octagon'
  }
});

export const SEVERITY_LEVELS = Object.freeze({
  1: REPORT_SEVERITY.LOW,
  2: REPORT_SEVERITY.MEDIUM,
  3: REPORT_SEVERITY.HIGH,
  4: REPORT_SEVERITY.CRITICAL
});

export const SEVERITY_LIST = Object.freeze(Object.values(REPORT_SEVERITY));

export default REPORT_SEVERITY;
