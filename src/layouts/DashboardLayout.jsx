import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";
import { useTranslation } from "react-i18next";
import { ROLE_LABELS } from "../constants";
import { Home, LogOut, Shield } from "lucide-react";

/**
 * DashboardLayout Component
 * Provides the layout structure for all dashboard pages
 * @param {ReactNode} children - Child components
 * @param {string} role - Current user's role
 */
function DashboardLayout({ children, role }) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();

  const menuItems = {
    admin: [
      { name: t('dashboard.dashboard'), path: "/admin", icon: Home },
    ],
    citizen: [
      { name: t('dashboard.dashboard'), path: "/citizen", icon: Home },
    ],
    observer: [
      { name: t('dashboard.dashboard'), path: "/observer", icon: Home },
    ],
    analyst: [
      { name: t('dashboard.dashboard'), path: "/analyst", icon: Home },
    ],
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const roleColors = {
    admin: 'from-red-500 to-orange-500',
    citizen: 'from-green-500 to-emerald-500',
    observer: 'from-blue-500 to-cyan-500',
    analyst: 'from-purple-500 to-pink-500',
  };

  return (
    <div className="flex min-h-screen bg-dark-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-800/50 backdrop-blur-xl border-r border-white/10 flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleColors[role] || roleColors.admin} flex items-center justify-center`}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold capitalize text-white">
                {role}
              </h2>
              <p className="text-xs text-gray-400">{t('dashboard.panel')}</p>
            </div>
          </div>
          {user && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${roleColors[role] || roleColors.admin} flex items-center justify-center text-sm font-bold`}>
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{ROLE_LABELS[user.role]}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems[role]?.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-lg bg-dark-700/50 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary-500 group-hover:to-orange-500 transition-all duration-200">
                <item.icon className="w-4 h-4" />
              </div>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-200 group"
          >
            <div className="w-8 h-8 rounded-lg bg-dark-700/50 flex items-center justify-center group-hover:bg-red-500/20 transition-all duration-200">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="font-medium">{t('dashboard.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content with Navbar */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 p-8 overflow-auto bg-dark-950 pt-4">
          {/* Top gradient bar */}
          <div className="fixed top-16 left-64 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-purple-500" />
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
