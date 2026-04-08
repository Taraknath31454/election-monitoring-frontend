// Re-export from modular files for backward compatibility
// Role Types
export { ROLE_TYPES, ROLE_LABELS, ROLE_COLORS } from './roleTypes';
export { default as ROLES } from './roleTypes';

// Report Status
export { 
  REPORT_STATUS, 
  STATUS_CONFIG, 
  STATUS_WORKFLOW, 
  STATUS_LIST 
} from './reportStatus';

// Report Severity
export { 
  REPORT_SEVERITY, 
  SEVERITY_CONFIG, 
  SEVERITY_LEVELS, 
  SEVERITY_LIST 
} from './reportSeverity';

// Other constants
export const REPORT_CATEGORIES = [
  'Voting Irregularity',
  'Fraud',
  'Intimidation',
  'Documentation Issue',
  'Technical Issue',
  'Other'
];

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark'
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 5,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50]
};

export const STORAGE_KEYS = {
  AUTH: 'ems_auth',
  REPORTS: 'ems_reports',
  USERS: 'ems_users',
  THEME: 'ems_theme'
};

export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REPORTS: '/api/reports',
  USERS: '/api/users',
  ANALYTICS: '/api/analytics'
};
