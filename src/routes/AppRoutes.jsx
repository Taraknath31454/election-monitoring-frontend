import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ProtectedRoute, { PublicRoute } from './ProtectedRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import About from '../pages/About';
import AccessDenied from '../pages/AccessDenied';
import NotFound from '../pages/NotFound';
import ForgotPassword from '../pages/ForgotPassword';
import Admin from '../pages/Admin';
import Citizen from '../pages/Citizen';
import Observer from '../pages/Observer';
import Analyst from '../pages/Analyst';
import { useAuthStore } from '../store/authStore';

// Page titles mapping
const PAGE_TITLES = {
  '/': 'Election Monitoring System - Home',
  '/login': 'Login - Election Monitoring System',
  '/signup': 'Sign Up - Election Monitoring System',
  '/admin': 'Admin Dashboard - Election Monitoring System',
  '/citizen': 'Citizen Portal - Election Monitoring System',
  '/observer': 'Observer Dashboard - Election Monitoring System',
  '/analyst': 'Analyst Dashboard - Election Monitoring System',
  '/about': 'About - Election Monitoring System',
  '/access-denied': 'Access Denied - Election Monitoring System',
};

// Custom hook for document title
function useDocumentTitle() {
  const location = useLocation();

  useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] || 'Election Monitoring System';
  }, [location]);
}

// Route definitions
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/about', component: About },
  { path: '/access-denied', component: AccessDenied },
  { path: '*', component: NotFound, exact: false },
];

// Role-based protected routes
const protectedRoutes = [
  { path: '/admin', component: Admin, allowedRole: 'admin' },
  { path: '/citizen', component: Citizen, allowedRole: 'citizen' },
  { path: '/observer', component: Observer, allowedRole: 'observer' },
  { path: '/analyst', component: Analyst, allowedRole: 'analyst' },
];

/**
 * AppRoutes Component
 * Central route configuration with protected and public routes
 */
function AppRoutes() {
  useDocumentTitle();

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.path === '/login' ? (
              <PublicRoute>
                <route.component />
              </PublicRoute>
            ) : (
              <route.component />
            )
          }
        />
      ))}

      {/* Protected Role-Based Routes */}
      {protectedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute allowedRole={route.allowedRole}>
              <route.component />
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  );
}

export default AppRoutes;
