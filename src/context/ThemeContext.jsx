import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { THEME } from '../constants/theme';

// Create context with default values
const ThemeContext = createContext(undefined);

/**
 * ThemeProvider Component
 * Manages dark/light mode state and provides theme toggle functionality
 * Uses localStorage for persistence
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Try to get theme from localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME.STORAGE_KEY);
      if (savedTheme) {
        return savedTheme;
      }
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return THEME.DARK;
      }
    }
    return THEME.DARK; // Default to dark
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === THEME.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Store in localStorage
    localStorage.setItem(THEME.STORAGE_KEY, theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => 
      prevTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK
    );
  }, []);

  // Set specific theme
  const setThemeMode = useCallback((mode) => {
    if (mode === THEME.LIGHT || mode === THEME.DARK) {
      setTheme(mode);
    }
  }, []);

  // Check if dark mode
  const isDark = theme === THEME.DARK;

  const value = {
    theme,
    isDark,
    toggleTheme,
    setThemeMode,
    isLight: !isDark,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme Hook
 * Access theme context in components
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

export default ThemeContext;
