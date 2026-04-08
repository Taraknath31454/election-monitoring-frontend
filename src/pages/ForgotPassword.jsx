import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AnimatedMonsters from '../components/AnimatedMonsters';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import '../pages/Login.css'; // Reuse login styling

function ForgotPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setMessage('Password reset link sent to your email!');
    setLoading(false);
  };

  return (
    <div className="login-container">
      {/* Left Side - Monsters */}
      <div className="login-left">
        <div className="login-left-content">
          <AnimatedMonsters />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="login-right">
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>{t('forgotPassword.title', 'Reset Password')}</h2>
            <p className="subtitle">{t('forgotPassword.subtitle', 'Enter your email to receive reset instructions')}</p>

            {message && (
              <div className="error-message bg-green-100 text-green-800 p-3 rounded mb-4">
                {message}
              </div>
            )}

            <input
              type="email"
              placeholder={t('forgotPassword.email', 'Enter your email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                disabled={loading}
              >
                {t('forgotPassword.backToLogin', 'Back to Login')}
              </button>
              <button type="submit" disabled={loading} className="flex-1">
                {loading ? <LoadingSpinner size="sm" color="black" /> : t('forgotPassword.send', 'Send Reset Link')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

