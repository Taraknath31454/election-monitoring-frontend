/**
 * Role Types for the Election Monitoring System
 * Using constants instead of hardcoded strings for type safety
 */

export const ROLE_TYPES = Object.freeze({
  ADMIN: 'admin',
  CITIZEN: 'citizen',
  OBSERVER: 'observer',
  ANALYST: 'analyst'
});

export const ROLE_LABELS = Object.freeze({
  [ROLE_TYPES.ADMIN]: 'Admin',
  [ROLE_TYPES.CITIZEN]: 'Citizen',
  [ROLE_TYPES.OBSERVER]: 'Observer',
  [ROLE_TYPES.ANALYST]: 'Analyst'
});

export const ROLE_COLORS = Object.freeze({
  [ROLE_TYPES.ADMIN]: 'amber',
  [ROLE_TYPES.CITIZEN]: 'green',
  [ROLE_TYPES.OBSERVER]: 'blue',
  [ROLE_TYPES.ANALYST]: 'purple'
});

export default ROLE_TYPES;
