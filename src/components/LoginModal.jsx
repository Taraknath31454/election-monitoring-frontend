/**
 * Reusable Modal Component for Login Required Popup
 * Props:
 * - isOpen: boolean - controls modal visibility
 * - onClose: function - callback to close modal
 * - onGoToLogin: function - callback when "Go to Login" is clicked
 */
function LoginModal({ isOpen, onClose, onGoToLogin }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark transparent overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md mx-4 p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 animate-fade-in">
        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-amber-500/20">
            <svg 
              className="w-8 h-8 text-amber-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white">Login Required</h3>
          <p className="mt-2 text-gray-400">
            Please login to submit a report.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
          <button
            onClick={onGoToLogin}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-900 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
