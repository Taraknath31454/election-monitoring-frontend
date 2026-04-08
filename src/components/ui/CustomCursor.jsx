import { useState, useEffect, useCallback } from 'react';

/**
 * CustomCursor Component
 * Creates a subtle glowing orb cursor that follows mouse with delay
 * Features:
 * - Soft gradient (blue → purple)
 * - Follows mouse with slight delay using lerp
 * - Expands and glow intensifies on button hover
 * - Performance optimized with requestAnimationFrame
 * - Hidden on touch devices
 */
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Check for touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((e) => {
    setTargetPosition({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  // Handle mouse enter/leave for hover states
  const handleMouseOver = useCallback((e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  // Animation loop using requestAnimationFrame
  useEffect(() => {
    if (isTouchDevice) return;

    let animationFrameId;

    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.12,
        y: prev.y + (targetPosition.y - prev.y) * 0.12,
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetPosition, isTouchDevice]);

  // Add event listeners
  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Hide default cursor on desktop */}
      <style>{`
        body { cursor: none; }
        a, button { cursor: none; }
        * { cursor: none !important; }
      `}</style>
      
      {/* Custom cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: 0,
          top: 0,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        {/* Outer glow */}
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
            isHovering ? 'scale-150' : 'scale-100'
          }`}
          style={{
            width: isHovering ? '48px' : '32px',
            height: isHovering ? '48px' : '32px',
          }}
        >
          {/* Gradient orb with glow */}
          <div
            className={`w-full h-full rounded-full transition-all duration-200 ${
              isHovering ? 'opacity-80' : 'opacity-60'
            }`}
            style={{
              background: 'radial-gradient(circle at 30% 30%, #818cf8 0%, #6366f1 40%, #4f46e5 100%)',
              boxShadow: isHovering
                ? '0 0 30px rgba(99, 102, 241, 0.8), 0 0 60px rgba(139, 92, 246, 0.4)'
                : '0 0 15px rgba(99, 102, 241, 0.6), 0 0 30px rgba(139, 92, 246, 0.3)',
            }}
          />
        </div>
      </div>
    </>
  );
}

export default CustomCursor;
