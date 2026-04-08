import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '../constants';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      
      /**
       * Login using authService (now real API)
       */
      login: async (email, password) => {
        set({ loading: true, error: null });
        
        // Import dynamically to avoid circular dependency
        const { authService } = await import('../services/authService');
        
        const result = await authService.login(email, password);
        
if (result.success && result.user) {
          localStorage.setItem("user", JSON.stringify(result.user));
          set({ 
            user: result.user, 
            isAuthenticated: true, 
            loading: false,
            error: null 
          });
          return true;
        } else {
          set({ 
            loading: false, 
            error: result.error || 'Login failed'
          });
          return false;
        }
      },
      
      logout: () => {
        localStorage.removeItem("user");

        set({ user: null, isAuthenticated: false, error: null });
      },
      
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData }
        }));
      },
      
      clearError: () => set({ error: null }),
      
      /**
       * Admin user management (mock for now - integrate with real API later)
       */
      getUsers: () => [], // Will be populated by admin page
      addUser: async () => ({ success: false }),
      updateUserRole: () => {},
      toggleUserActive: () => {},
      deleteUser: () => {},
      getUserById: () => null,
      getUsersByRole: () => [],
    }),
    {
      name: STORAGE_KEYS.AUTH,
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
);

export default useAuthStore;
