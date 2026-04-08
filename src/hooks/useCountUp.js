import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useCountUp Hook
 * Animated counter that counts up from 0 to target value
 * @param {number} target - Target number to count up to
 * @param {number} duration - Animation duration in milliseconds
 * @param {boolean} start - Whether to start the animation
 * @returns {number} Current count value
 */
export function useCountUp(target, duration = 2000, start = true) {
  const [count, setCount] = useState(0);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  const animate = useCallback((timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out cubic)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    
    const currentCount = Math.floor(easeOut * target);
    setCount(currentCount);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [target, duration]);

  useEffect(() => {
    if (start && target > 0) {
      startTimeRef.current = null;
      animationRef.current = requestAnimationFrame(animate);
    } else if (!start) {
      setCount(0);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [start, target, animate]);

  // Reset when target changes
  useEffect(() => {
    if (start) {
      setCount(0);
      startTimeRef.current = null;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [target, start, animate]);

  return count;
}

/**
 * useCountUpGroup Hook
 * For animating multiple counters with staggered starts
 * @param {Array<number>} targets - Array of target numbers
 * @param {number} duration - Animation duration per counter
 * @param {number} staggerDelay - Delay between each counter start
 * @returns {Array<number>} Array of current count values
 */
export function useCountUpGroup(targets, duration = 2000, staggerDelay = 200) {
  const [counts, setCounts] = useState(Array(targets.length).fill(0));
  const animationRefs = useRef([]);
  const startTimeRefs = useRef([]);

  useEffect(() => {
    // Reset
    setCounts(Array(targets.length).fill(0));
    animationRefs.current.forEach(ref => {
      if (ref) cancelAnimationFrame(ref);
    });
    animationRefs.current = [];
    startTimeRefs.current = [];

    const animateCounter = (index) => {
      return (timestamp) => {
        if (!startTimeRefs.current[index]) {
          startTimeRefs.current[index] = timestamp;
        }

        const elapsed = timestamp - startTimeRefs.current[index];
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOut * targets[index]);

        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = currentCount;
          return newCounts;
        });

        if (progress < 1) {
          animationRefs.current[index] = requestAnimationFrame(animateCounter(index));
        }
      };
    };

    // Start each counter with stagger
    targets.forEach((target, index) => {
      setTimeout(() => {
        animationRefs.current[index] = requestAnimationFrame(animateCounter(index));
      }, index * staggerDelay);
    });

    return () => {
      animationRefs.current.forEach(ref => {
        if (ref) cancelAnimationFrame(ref);
      });
    };
  }, [targets, duration, staggerDelay]);

  return counts;
}

export default useCountUp;
