import { ROLES } from '../constants';
import { STORAGE_KEYS } from '../constants';

/**
 * AuthService - Real backend authentication
 */
export const authService = {
  /**
   * Register new user with role request
   * @param {Object} userData - {name, email, password, requestedRole}
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  register: async (userData) => {
    try {
      const response = await fetch('http://localhost:8085/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Registration failed: ${response.status}`);
      }

      const data = await response.json();
console.log("BACKEND RESPONSE (register):", data);

      return { success: true, message: data.message || 'Registration successful' };
    } catch (error) {
      console.error('Register API error:', error);
      const errorMsg = error.name === 'TypeError' 
        ? 'Backend not reachable. Check if server running on http://localhost:8085.'
        : error.message || 'Registration failed. Please try again.';
      return {
        success: false,
        error: errorMsg
      };
    }
  },

  /**
   * Login user with real backend API
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{success: boolean, user?: object, error?: string}>}
   */
  login: async (email, password) => {
    try {
      const response = await fetch('http://localhost:8085/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.message || 'Login failed. Please check your credentials.'
        };
      }

      const data = await response.json();
      console.log("BACKEND RESPONSE:", data);
      
      // Normalize role to lowercase per task spec
      const role = data.role?.toLowerCase()?.trim() || data.user?.role?.toString().toLowerCase()?.trim();
      
      // Valid normalized roles
      const validRoles = ['admin', 'citizen', 'observer', 'analyst'];
      
      if (!role) {
        throw new Error("Invalid role from server: missing (no role in response). Check backend.");
      }
      
      if (validRoles.includes(role)) {
        return {
          success: true,
          user: {
            email: data.email || email,
            role
          }
        };
      } else {
        console.error("Invalid role received:", role);
        throw new Error(`Invalid role from server: ${role}`);
      }
    } catch (error) {
      console.error('Auth API error:', error);
      const errorMsg = error.name === 'TypeError' || !error.response 
        ? 'Backend not reachable. Check if server running on http://localhost:8085.'
        : error.message || 'Login failed. Please check backend server.';
      return {
        success: false,
        error: errorMsg
      };
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    return { success: true };
  },

  /**
   * Get current user from localStorage
   */
  getCurrentUser: () => {
    try {
      const authData = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (authData) {
        const parsed = JSON.parse(authData);
        return parsed.state?.user || null;
      }
      return null;
    } catch {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    try {
      const authData = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (authData) {
        const parsed = JSON.parse(authData);
        return parsed.state?.isAuthenticated || false;
      }
      return false;
    } catch {
      return false;
    }
  },

  /**
   * Validate user role
   */
  validateRole: (role) => {
    const validRoles = Object.values(ROLES);
    return validRoles.includes(role);
  },
};

export default authService;
