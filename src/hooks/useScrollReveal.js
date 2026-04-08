import React, { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal Hook
 * Uses IntersectionObserver to trigger reveal animations on scroll
 * @param {Object} options - IntersectionObserver options
 * @returns {Array} [ref, isVisible]
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
}

/**
 * useScrollRevealGroup Hook
 * For revealing multiple elements with staggered delays
 * @param {number} itemCount - Number of items
 * @param {number} staggerDelay - Delay between each item in ms
 * @param {Object} options - IntersectionObserver options
 * @returns {Object} { refs, visibleItems }
 */
export function useScrollRevealGroup(itemCount, staggerDelay = 100, options = {}) {
  const refs = useRef(Array(itemCount).fill(null).map(() => React.createRef()));
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const elements = refs.current.map(ref => ref.current).filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = elements.indexOf(entry.target);
            if (index !== -1 && !visibleItems.includes(index)) {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * staggerDelay);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, [itemCount, staggerDelay, options.threshold, options.rootMargin]);

  return { refs: refs.current, visibleItems };
}

export default useScrollReveal;
