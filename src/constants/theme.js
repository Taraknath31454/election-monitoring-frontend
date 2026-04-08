/**
 * Design Tokens - Centralized Theme Configuration
 * Premium color palette and design system constants
 */

// Color Palette
export const COLORS = {
  // Primary - Indigo-600 / Blue-600
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  
  // Accent - Amber-500
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // Success - Emerald-500
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  
  // Warning - Yellow-400
  warning: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  
  // Danger - Red-500
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  // Background Colors
  background: {
    dark: '#0f172a',
    darkSecondary: '#1e293b',
    light: '#f8fafc',
    lightSecondary: '#ffffff',
  },
  
  // Card Colors
  card: {
    dark: 'rgba(255, 255, 255, 0.05)',
    light: 'rgba(0, 0, 0, 0.05)',
    darkHover: 'rgba(255, 255, 255, 0.1)',
    lightHover: 'rgba(0, 0, 0, 0.08)',
  },
  
  // Border Colors
  border: {
    dark: 'rgba(255, 255, 255, 0.1)',
    light: 'rgba(0, 0, 0, 0.1)',
    darkHover: 'rgba(255, 255, 255, 0.2)',
    lightHover: 'rgba(0, 0, 0, 0.2)',
  },
};

// Gradient definitions
export const GRADIENTS = {
  primary: 'from-primary-500 to-orange-500',
  primaryHover: 'from-primary-400 to-orange-400',
  accent: 'from-accent-500 to-purple-600',
  accentHover: 'from-accent-400 to-purple-500',
  hero: 'from-primary-400 via-orange-400 to-amber-400',
  card: 'from-gray-800/60 to-gray-900/60',
};

// Animation durations
export const ANIMATION = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  transition: 'transition-colors duration-500',
};

// Shadow definitions
export const SHADOWS = {
  soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  card: '0 0 0 1px rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.15)',
  modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  glow: {
    blue: '0 0 20px rgba(99, 102, 241, 0.3)',
    purple: '0 0 20px rgba(139, 92, 246, 0.3)',
    amber: '0 0 20px rgba(245, 158, 11, 0.3)',
    green: '0 0 20px rgba(34, 197, 94, 0.3)',
  },
};

// Border radius
export const RADIUS = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
};

// Glassmorphism defaults
export const GLASS = {
  dark: {
    background: 'bg-gray-800/40',
    backdrop: 'backdrop-blur-xl',
    border: 'border border-white/10',
  },
  light: {
    background: 'bg-white/60',
    backdrop: 'backdrop-blur-xl',
    border: 'border border-black/10',
  },
};

// Theme constants
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  STORAGE_KEY: 'ems_theme',
};

// Spacing
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
};

// Typography
export const TYPOGRAPHY = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Inter', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Default theme configuration
export const DEFAULT_CONFIG = {
  primaryColor: 'primary',
  accentColor: 'accent',
  borderRadius: 'xl',
  enableAnimations: true,
  reducedMotion: false,
};

export default {
  COLORS,
  GRADIENTS,
  ANIMATION,
  SHADOWS,
  RADIUS,
  GLASS,
  THEME,
  SPACING,
  TYPOGRAPHY,
  BREAKPOINTS,
  DEFAULT_CONFIG,
};
