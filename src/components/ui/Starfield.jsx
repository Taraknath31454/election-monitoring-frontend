import { useMemo } from 'react';

/**
 * Starfield Component
 * Creates a subtle animated starfield background with twinkling stars
 * Features:
 * - Very light particles at extremely low opacity
 * - Soft twinkle animation
 * - Performance optimized with requestAnimationFrame
 */
function Starfield({ count = 150, className = '' }) {
  // Generate random stars with consistent positions
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1, // 1-3px
      opacity: Math.random() * 0.5 + 0.2, // 0.2-0.7 opacity
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 3 + 3}s`, // 3-6s
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
          }}
        />
      ))}
    </div>
  );
}

export default Starfield;
