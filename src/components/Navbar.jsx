import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, Shield, User, LogIn, UserPlus } from 'lucide-react';
import { ROLE_LABELS } from '../constants/roleTypes';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const authStore = useAuthStore();
  const { user, logout, isAuthenticated } = authStore;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    logout();
    localStorage.removeItem('authUser');
    navigate('/login', { replace: true });
  };

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900/95 via-purple-900/20 to-slate-900/95 backdrop-blur-xl border-b border-white/10 supports-[backdrop-filter:blur(20px)]:bg-slate-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo LEFT - Always visible */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-4 h-4 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Election System
              </h1>
              {isAuthenticated && user && (
                <p className="text-xs font-medium text-emerald-400 capitalize">
                  {ROLE_LABELS[user.role] || user.role} Panel
                </p>
              )}
            </div>
          </div>

          {/* Right side - Conditional */}
          <div className="flex items-center space-x-2">
            {isAuthenticated && user ? (
              <>
                {/* Auth user info */}
                <div className="flex items-center space-x-2 text-sm text-gray-300 hidden md:flex">
                  <User className="w-4 h-4" />
                  <span className="font-medium max-w-32 truncate">{user.email}</span>
                </div>
                
                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 border border-white/10 hover:border-red-400/30 group"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Unauth buttons TOP RIGHT */}
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all duration-200 border border-white/10 hover:border-emerald-400/30"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Up</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

