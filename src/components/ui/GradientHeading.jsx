/**
 * GradientHeading Component
 * A reusable heading with gradient text effect
 * @param {ReactNode} children - Heading content
 * @param {string} className - Additional CSS classes
 * @param {string} as - Heading element (h1, h2, h3, h4, h5, h6)
 * @param {string} gradient - Gradient variant (indigo, amber, emerald, purple, blue)
 */
function GradientHeading({ 
  children, 
  className = '', 
  as: Component = 'h2',
  gradient = 'indigo'
}) {
  const gradientClasses = {
    indigo: 'from-indigo-400 via-purple-400 to-cyan-400',
    amber: 'from-amber-400 via-orange-400 to-yellow-400',
    emerald: 'from-emerald-400 via-teal-400 to-cyan-400',
    purple: 'from-purple-400 via-pink-400 to-rose-400',
    blue: 'from-blue-400 via-cyan-400 to-teal-400',
    white: 'from-white via-gray-200 to-gray-400',
  };

  const sizeClasses = {
    h1: 'text-5xl md:text-6xl lg:text-7xl font-bold',
    h2: 'text-4xl md:text-5xl font-bold',
    h3: 'text-3xl md:text-4xl font-semibold',
    h4: 'text-2xl md:text-3xl font-semibold',
    h5: 'text-xl md:text-2xl font-medium',
    h6: 'text-lg md:text-xl font-medium',
  };

  return (
    <Component 
      className={`
        ${sizeClasses[Component]}
        bg-gradient-to-r ${gradientClasses[gradient]}
        bg-clip-text text-transparent
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

export default GradientHeading;
