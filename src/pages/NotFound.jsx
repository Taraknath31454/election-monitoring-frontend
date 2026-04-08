import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import GlassCard from '../components/ui/GlassCard';
import PrimaryButton from '../components/ui/PrimaryButton';
import { Home, ArrowLeft, Search } from 'lucide-react';

/**
 * NotFound (404) Page - Premium Design
 * Displayed when a user visits a non-existent route
 * Features: Glassmorphism, animated elements, dark/light mode support
 */
function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-500 ${isDark ? 'bg-dark-900' : 'bg-gray-50'}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-md w-full text-center">
        {/* 404 Visual with Animation */}
        <div className="mb-8 relative">
          <h1 className={`text-9xl font-bold ${isDark ? 'text-white/5' : 'text-gray-200'} animate-pulse-slow`}>404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-32 h-32 rounded-full ${isDark ? 'bg-dark-800/80' : 'bg-white/80'} backdrop-blur-xl border ${isDark ? 'border-white/10' : 'border-black/10'} flex items-center justify-center shadow-xl`}>
              <Search className={`w-12 h-12 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
          </div>
        </div>

        <GlassCard className="p-8" shimmer>
          {/* Title */}
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Page Not Found
          </h2>

          {/* Description */}
          <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track!
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <PrimaryButton 
              onClick={() => navigate('/')}
              icon={Home}
              size="lg"
            >
              Go Home
            </PrimaryButton>
            <PrimaryButton 
              onClick={() => navigate(-1)}
              variant="outline"
              icon={ArrowLeft}
              size="lg"
            >
              Go Back
            </PrimaryButton>
          </div>
        </GlassCard>

        {/* Helpful Links */}
        <div className={`mt-8 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          <p>Or try these popular pages:</p>
          <div className="flex justify-center gap-4 mt-3">
            <button 
              onClick={() => navigate('/about')}
              className={`hover:text-primary-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              About
            </button>
            <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>•</span>
            <button 
              onClick={() => navigate('/login')}
              className={`hover:text-primary-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
