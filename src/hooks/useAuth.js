import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import authService from '../services/authService';

/**
 * useAuth Hook
 * Provides authentication functionality and user state
 * @returns {object} Authentication methods and state
 */
export function useAuth() {
  const navigate = useNavigate();
  const { 
    user, 
    isAuthenticated, 
    loading, 
    error,
    login: storeLogin,
    logout: storeLogout,
    updateUser,
    clearError
  } = useAuthStore();

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<boolean>} Login success status
   */
  const login = useCallback(async (email, password) => {
    const result = await storeLogin(email, password);
    
    if (result) {
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        navigate(`/${currentUser.role}`, { replace: true });
      }
    }
    
    return result;
  }, [storeLogin, navigate]);

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    storeLogout();
    navigate('/', { replace: true });
  }, [storeLogout, navigate]);

  /**
   * Check if user has specific role
   * @param {string} role - Role to check
   * @returns {boolean}
   */
  const hasRole = useCallback((role) => {
    return user?.role === role;
  }, [user]);

  /**
   * Check if user has any of the specified roles
   * @param {string[]} roles - Array of roles
   * @returns {boolean}
   */
  const hasAnyRole = useCallback((roles) => {
    return roles.includes(user?.role);
  }, [user]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    updateUser,
    clearError,
    hasRole,
    hasAnyRole,
    isAdmin: hasRole('admin'),
    isCitizen: hasRole('citizen'),
    isObserver: hasRole('observer'),
    isAnalyst: hasRole('analyst'),
  };
}

export default useAuth;
