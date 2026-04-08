import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

/**
 * ProtectedRoute Component
 * Protects routes based on user authentication and role
 * @param {ReactNode} children - The child components to render
 * @param {string} allowedRole - The role allowed to access this route
 */
function ProtectedRoute({ children, allowedRole }) {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  // Check if user is authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}

/**
 * PublicRoute Component
 * Redirects authenticated users away from public routes (e.g., login)
 * @param {ReactNode} children - The child components to render
 */
function PublicRoute({ children }) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // If already authenticated, redirect to their dashboard
  if (isAuthenticated && user) {
    const defaultRoute = `/${user.role}`;
    const from = location.state?.from?.pathname || defaultRoute;
    return <Navigate to={from} replace />;
  }

  return children;
}

/**
 * RoleProtectedRoute Component
 * Protects routes for multiple allowed roles
 * @param {ReactNode} children - The child components to render
 * @param {string[]} allowedRoles - Array of roles allowed to access this route
 */
function RoleProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}

/**
 * Check if user has access to a specific role
 * @param {string} userRole - The user's role
 * @param {string} requiredRole - The required role
 */
export function hasRoleAccess(userRole, requiredRole) {
  if (!userRole || !requiredRole) return false;
  return userRole === requiredRole;
}

/**
 * Check if user has any of the specified roles
 * @param {string} userRole - The user's role
 * @param {string[]} allowedRoles - Array of allowed roles
 */
export function hasAnyRole(userRole, allowedRoles) {
  if (!userRole || !allowedRoles?.length) return false;
  return allowedRoles.includes(userRole);
}

export { PublicRoute, RoleProtectedRoute };
export default ProtectedRoute;
