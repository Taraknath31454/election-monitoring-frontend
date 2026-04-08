import { useState, useRef, useCallback } from 'react';

/**
 * PrimaryButton Component
 * A reusable primary button with gradient background and hover effects
 * Features: Magnetic hover, ripple effect, animated border glow, dark/light mode support
 * @param {ReactNode} children - Button content
 * @param {string} className - Additional CSS classes
 * @param {string} variant - Button variant (primary, secondary, danger, outline)
 * @param {boolean} disabled - Disable the button
 * @param {function} onClick - Click handler
 * @param {string} type - Button type (button, submit, reset)
 * @param {boolean} icon - Whether to show icon (left icon slot)
 * @param {string} size - Button size (sm, md, lg)
 */
function PrimaryButton({ 
  children, 
  className = '', 
  variant = 'primary',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  size = 'md'
}) {
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  // Handle ripple effect
  const handleClick = useCallback((e) => {
    if (disabled) return;
    
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  }, [disabled, onClick]);

  // Magnetic hover effect
  const handleMouseMove = useCallback((e) => {
    if (disabled) return;
    
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const x = (e.clientX - rect.left - centerX) / centerX;
    const y = (e.clientY - rect.top - centerY) / centerY;

    setMagneticPos({ x: x * 4, y: y * 4 });
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setMagneticPos({ x: 0, y: 0 });
  }, []);

  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-primary-500 to-orange-500 
      text-gray-900
      hover:from-primary-400 hover:to-orange-400
      focus:ring-primary-500
      shadow-lg shadow-primary-500/25
      hover:shadow-primary-500/40
    `,
    secondary: `
      bg-gradient-to-r from-accent-500 to-purple-600
      text-white
      hover:from-accent-400 hover:to-purple-500
      focus:ring-accent-500
      shadow-lg shadow-accent-500/25
      hover:shadow-accent-500/40
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600
      text-white
      hover:from-red-400 hover:to-red-500
      focus:ring-red-500
      shadow-lg shadow-red-500/25
      hover:shadow-red-500/40
    `,
    outline: `
      bg-transparent
      border-2 border-primary-500
      text-primary-500 dark:text-primary-500
      hover:bg-primary-500/10
      focus:ring-primary-500
    `,
    ghost: `
      bg-transparent
      text-gray-700 dark:text-gray-300
      hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white
      focus:ring-gray-500
    `,
  };

  // Magnetic transform style
  const magneticStyle = {
    transform: `translate(${magneticPos.x}px, ${magneticPos.y}px)`,
    transition: 'transform 0.2s ease-out',
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      style={magneticStyle}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple-effect"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
      
      {/* Animated border glow for outline variant */}
      {variant === 'outline' && (
        <span className="absolute inset-0 rounded-xl animate-border-glow pointer-events-none" />
      )}
      
      {/* Content with magnetic hover on icon */}
      <span className="relative z-10 flex items-center">
        {Icon && (
          <span 
            className="mr-2 transition-transform duration-200"
            style={{
              transform: `translate(${magneticPos.x * -0.25}px, ${magneticPos.y * -0.25}px)`,
            }}
          >
            <Icon className="w-5 h-5" />
          </span>
        )}
        {children}
      </span>
    </button>
  );
}

export default PrimaryButton;
