import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AnimatedMonsters from "../components/AnimatedMonsters";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login, loading, error, clearError, user } = useAuthStore();
  const { t } = useTranslation();

  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);

  // Clear auth errors on mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(false);

    const success = await login(email, password);

    if (success) {
      // Navigate based on role
      const userRole = useAuthStore.getState().user?.role;
      if (userRole) {
        navigate(`/${userRole}`);
      }
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 500);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-container">
      {/* Left Side - Monsters */}
      <div className="login-left">
        <div className="login-left-content">
          <AnimatedMonsters 
            showPassword={showPassword} 
            loginError={loginError} 
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-right">
        <div className="login-card">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>{t('login.welcomeBack')}</h2>
            <p className="subtitle">{t('login.enterCredentials')}</p>

            {(error || loginError) && (
              <div className="error-message">
                {error || t('login.invalidCredentials')}
              </div>
            )}

            <input
              type="text"
              placeholder={t('login.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t('login.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
              />
              <span 
                className="password-field-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? t('login.hidePassword') : t('login.showPassword')}
              </span>
            </div>

            {/* Forgot Password Link */}
            <p
              onClick={handleForgotPassword}
              className="mt-2 text-left text-sm text-blue-400 hover:underline transition-colors cursor-pointer"
            >
              Forgot password?
            </p>

            {/* Sign Up Link */}
            <div className="mt-4 mb-6 text-center">
              <p className="text-sm text-gray-400">
                New here?{' '}
                <a
                  href="/signup"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/signup');
                  }}
                  className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors ml-1 cursor-pointer"
                >
                  Sign Up
                </a>
              </p>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? <LoadingSpinner size="sm" color="black" /> : t('login.signIn')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
