/**
 * SectionWrapper Component
 * A reusable section wrapper with consistent spacing and max-width
 * @param {ReactNode} children - Child components
 * @param {string} className - Additional CSS classes
 * @param {string} background - Background variant (transparent, subtle, gradient)
 * @param {boolean} id - Optional section ID
 */
function SectionWrapper({ 
  children, 
  className = '', 
  background = 'transparent',
  id
}) {
  const backgroundClasses = {
    transparent: '',
    subtle: 'bg-gray-800/30',
    gradient: 'bg-gradient-to-b from-gray-800/50 to-gray-900',
    dark: 'bg-dark-900',
  };

  return (
    <section 
      id={id}
      className={`
        relative py-20 px-4 sm:px-6 lg:px-8
        ${backgroundClasses[background]}
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}

export default SectionWrapper;
