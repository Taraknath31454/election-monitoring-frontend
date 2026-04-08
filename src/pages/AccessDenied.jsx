import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ROLE_LABELS } from '../constants';

/**
 * AccessDenied Page
 * Displayed when a user tries to access a route they're not authorized for
 */
function AccessDenied() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleGoHome = () => {
    // Navigate based on user's role
    if (user?.role) {
      navigate(`/${user.role}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Access Denied
        </h1>

        {/* Description */}
        <p className="text-gray-400 mb-8">
          You don't have permission to access this page. 
          {user?.role && (
            <> This area is restricted to <span className="text-amber-500 font-medium">{ROLE_LABELS[user.role]}</span> users only.</>
          )}
        </p>

        {/* User Info */}
        {user && (
          <div className="bg-gray-800 rounded-lg p-4 mb-8 border border-gray-700">
            <p className="text-sm text-gray-400 mb-1">Logged in as</p>
            <p className="text-white font-medium">{user.name}</p>
            <p className="text-sm text-amber-500">{ROLE_LABELS[user.role]}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleGoHome}
            className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold rounded-lg transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
