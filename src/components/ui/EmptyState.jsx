/**
 * EmptyState Component
 * Displays a friendly message when there's no data
 * @param {string} title - The title message
 * @param {string} description - The description message
 * @param {ReactNode} icon - Optional icon to display
 * @param {ReactNode} action - Optional action button
 */
function EmptyState({ 
  title = 'No Data Found', 
  description = 'There are no items to display.',
  icon,
  action 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 mb-6 rounded-full bg-gray-800 flex items-center justify-center">
        {icon || (
          <svg 
            className="w-10 h-10 text-gray-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        )}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-center max-w-md mb-6">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export default EmptyState;
