import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import authService from "../services/authService";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AnimatedMonsters from "../components/AnimatedMonsters";
import "./Login.css"; // Reuse login styling

function Signup() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) newErrors.email = "Email is invalid";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const result = await authService.register(formData);
      
      if (result.success) {
        setSubmitSuccess(true);
        
        // Redirect to login
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        throw new Error(result.error);
      }

    } catch (error) {
      setSubmitError(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Monsters */}
      <div className="login-left">
        <div className="login-left-content">
          <AnimatedMonsters />
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="login-right">
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            <p className="subtitle">Join Election Monitoring System</p>

            {submitError && (
              <div className="error-message">
                {submitError}
              </div>
            )}

            {submitSuccess && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-lg mb-4 text-sm">
                Registration successful! Redirecting to login...
              </div>
            )}

            {/* Name */}
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1 ml-1">{errors.name}</p>}

            {/* Email */}
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1 ml-1">{errors.email}</p>}

            {/* Password */}
            <div className="password-field">
              <input
                name="password"
                type="password"
                placeholder="Password (8+ chars)"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1 ml-1">{errors.password}</p>}

            <p className="text-sm text-gray-400 mb-3 text-center">
              All new registrations are created as citizens and will be reviewed by an administrator.
            </p>

            <button type="submit" disabled={loading}>
              {loading ? <LoadingSpinner size="sm" color="black" /> : "Sign Up"}
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors"
                  disabled={loading}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
