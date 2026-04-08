import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useParallax Hook
 * Creates mouse-based parallax effect for background elements
 * @param {number} speed - Movement speed multiplier (0-1)
 * @returns {Object} { style, resetPosition }
 */
export function useParallax(speed = 0.05) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    // Clear previous timeout to debounce
    if (timeoutRef.current) {
      cancelAnimationFrame(timeoutRef.current);
    }

    // Calculate center of viewport
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Calculate distance from center (normalized to -1 to 1)
    const normalizedX = (e.clientX - centerX) / centerX;
    const normalizedY = (e.clientY - centerY) / centerY;

    // Apply speed multiplier
    const targetX = normalizedX * speed * 100;
    const targetY = normalizedY * speed * 100;

    timeoutRef.current = requestAnimationFrame(() => {
      setPosition({ x: targetX, y: targetY });
    });
  }, [speed]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) {
        cancelAnimationFrame(timeoutRef.current);
      }
    };
  }, [handleMouseMove]);

  const resetPosition = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: 'transform 0.3s ease-out',
  };

  return { style, resetPosition, position };
}

/**
 * useParallaxTilt Hook
 * Creates 3D tilt effect on cards based on mouse position
 * @param {Object} options - Configuration options
 * @returns {Object} { style, handleMouseMove, handleMouseLeave }
 */
export function useParallaxTilt(options = {}) {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.02,
    speed = 1000,
    reset = true,
  } = options;

  const ref = useRef(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const calculateTilt = useCallback((e) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Mouse position relative to element center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation (normalized to -maxTilt to maxTilt)
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
    const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;

    setTransform({
      rotateX,
      rotateY,
      scale,
    });
  }, [maxTilt, scale]);

  const resetTilt = useCallback(() => {
    setTransform({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
  }, []);

  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => calculateTilt(e));
  }, [calculateTilt]);

  const handleMouseLeave = useCallback(() => {
    if (reset) {
      requestAnimationFrame(() => resetTilt());
    }
  }, [reset, resetTilt]);

  const style = {
    transform: `
      perspective(${perspective}px)
      rotateX(${transform.rotateX}deg)
      rotateY(${transform.rotateY}deg)
      scale(${transform.scale})
    `,
    transition: `transform ${speed}ms ease-out`,
  };

  return { 
    ref, 
    style, 
    handleMouseMove, 
    handleMouseLeave,
    transform 
  };
}

export default useParallax;
