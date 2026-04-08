import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

/**
 * ThemeToggle Component
 * Animated toggle switch for dark/light mode
 * Features smooth transition animation
 */
function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex h-10 w-20 items-center rounded-full
        bg-dark-800 dark:bg-dark-700
        border border-white/10 dark:border-white/10
        transition-all duration-500 ease-in-out
        hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900
        ${className}
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Background track */}
      <span 
        className={`
          absolute inset-1 rounded-full 
          bg-gradient-to-r from-primary-500/20 to-accent-500/20
          transition-all duration-500
          ${isDark ? 'opacity-100' : 'opacity-50'}
        `}
      />
      
      {/* Sun icon (light mode) */}
      <span 
        className={`
          absolute left-2 flex items-center justify-center
          text-accent-400 transition-all duration-500
          ${isDark ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}
        `}
      >
        <Sun className="w-4 h-4" />
      </span>
      
      {/* Moon icon (dark mode) */}
      <span 
        className={`
          absolute right-2 flex items-center justify-center
          text-primary-400 transition-all duration-500
          ${isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}
        `}
      >
        <Moon className="w-4 h-4" />
      </span>
      
      {/* Thumb/Handle */}
      <span
        className={`
          absolute left-1 top-1 h-8 w-8 rounded-full
          bg-gradient-to-br from-primary-500 to-accent-500
          shadow-lg shadow-primary-500/30
          transition-all duration-500 ease-in-out
          ${isDark ? 'translate-x-10' : 'translate-x-0'}
        `}
      >
        {/* Inner shine */}
        <span className="absolute inset-0.5 rounded-full bg-white/20" />
      </span>
    </button>
  );
}

export default ThemeToggle;
