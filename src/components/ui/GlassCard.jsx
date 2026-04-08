import { useState, useRef, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * GlassCard Component
 * A reusable glassmorphism card with backdrop blur and subtle border
 * Features: 3D tilt effect, shadow layering, glass shimmer, dark/light mode support
 * @param {ReactNode} children - Child components
 * @param {string} className - Additional CSS classes
 * @param {boolean} hover - Enable hover effects
 * @param {string} glowColor - Optional glow color (blue, purple, amber, green)
 * @param {boolean} tilt - Enable 3D tilt effect
 * @param {boolean} shimmer - Enable glass shimmer effect
 */
function GlassCard({ 
  children, 
  className = '', 
  hover = true, 
  glowColor,
  tilt = false,
  shimmer = false
}) {
  const { isDark } = useTheme();
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });
  const cardRef = useRef(null);

  const glowClasses = {
    blue: 'hover:shadow-glow-blue hover:border-accent-400/30 dark:hover:border-accent-400/30',
    purple: 'hover:shadow-glow-purple hover:border-purple-400/30 dark:hover:border-purple-400/30',
    amber: 'hover:shadow-glow-amber hover:border-primary-400/30 dark:hover:border-primary-400/30',
    green: 'hover:shadow-glow-green hover:border-green-400/30 dark:hover:border-green-400/30',
  };

  // Handle 3D tilt effect
  const handleMouseMove = useCallback((e) => {
    if (!tilt) return;
    
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation (max 15 degrees)
    const rotateY = (mouseX / (rect.width / 2)) * 15;
    const rotateX = -(mouseY / (rect.height / 2)) * 15;

    setTransform({
      rotateX,
      rotateY,
      scale: 1.02,
    });
  }, [tilt]);

  const handleMouseLeave = useCallback(() => {
    if (!tilt) return;
    
    setTransform({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
  }, [tilt]);

  // Combined transform style
  const transformStyle = tilt ? {
    transform: `
      perspective(1000px)
      rotateX(${transform.rotateX}deg)
      rotateY(${transform.rotateY}deg)
      scale(${transform.scale})
    `,
    transition: 'transform 0.2s ease-out',
  } : {};

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative overflow-hidden
        bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl
        border border-black/10 dark:border-white/10 rounded-2xl
        shadow-card shadow-layered
        ${hover ? `transition-all duration-300 hover:scale-[1.02] hover:border-black/20 dark:hover:border-white/20 ${glowColor ? glowClasses[glowColor] : ''}` : ''}
        ${className}
      `}
      style={transformStyle}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 pointer-events-none" />
      
      {/* Glass shimmer effect */}
      {shimmer && (
        <div className="absolute inset-0 glass-shimmer pointer-events-none" />
      )}
      
      {/* 3D shine effect on tilt */}
      {tilt && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{
            background: `linear-gradient(
              ${135 + transform.rotateY}deg,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.1) 50%,
              rgba(255,255,255,0) 100%
            )`,
            opacity: transform.scale > 1 ? 1 : 0,
          }}
        />
      )}
      
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

export default GlassCard;
