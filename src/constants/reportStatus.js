/**
 * Report Status Constants for the Election Monitoring System
 * Using enums instead of hardcoded strings
 */

export const REPORT_STATUS = Object.freeze({
  PENDING: 'Pending',
  UNDER_REVIEW: 'Under Review',
  RESOLVED: 'Resolved',
  REJECTED: 'Rejected'
});

export const STATUS_CONFIG = Object.freeze({
  [REPORT_STATUS.PENDING]: {
    label: 'Pending',
    color: 'amber',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-500',
    borderColor: 'border-amber-500/20',
    icon: 'clock'
  },
  [REPORT_STATUS.UNDER_REVIEW]: {
    label: 'Under Review',
    color: 'blue',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500/20',
    icon: 'eye'
  },
  [REPORT_STATUS.RESOLVED]: {
    label: 'Resolved',
    color: 'green',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
    borderColor: 'border-green-500/20',
    icon: 'check-circle'
  },
  [REPORT_STATUS.REJECTED]: {
    label: 'Rejected',
    color: 'red',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-500',
    borderColor: 'border-red-500/20',
    icon: 'x-circle'
  }
});

export const STATUS_WORKFLOW = Object.freeze({
  [REPORT_STATUS.PENDING]: [REPORT_STATUS.UNDER_REVIEW],
  [REPORT_STATUS.UNDER_REVIEW]: [REPORT_STATUS.RESOLVED, REPORT_STATUS.REJECTED],
  [REPORT_STATUS.RESOLVED]: [],
  [REPORT_STATUS.REJECTED]: []
});

export const STATUS_LIST = Object.freeze(Object.values(REPORT_STATUS));

export default REPORT_STATUS;
