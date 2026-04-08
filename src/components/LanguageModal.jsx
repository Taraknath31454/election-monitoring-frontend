import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languages, changeLanguage, markLanguageAsSelected, isFirstVisit } from '../i18n';

function LanguageModal() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(i18n.language || 'en');

  useEffect(() => {
    // Show modal only on first visit
    if (isFirstVisit()) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    changeLanguage(selectedLang);
    markLanguageAsSelected();
    setIsOpen(false);
  };

  const handleLanguageSelect = (code) => {
    setSelectedLang(code);
    changeLanguage(code);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      {/* Modal */}
      <div className="relative bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md mx-4 overflow-hidden animate-modal">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">{t('languageModal.title')}</h2>
          <p className="text-white/80 mt-2">{t('languageModal.subtitle')}</p>
        </div>

        {/* Language Options */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                  selectedLang === lang.code
                    ? 'bg-amber-500/20 border-amber-500 text-white'
                    : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <div className="text-left">
                  <p className="font-medium text-sm">{lang.nativeName}</p>
                  <p className="text-xs text-gray-400">{lang.name}</p>
                </div>
                {selectedLang === lang.code && (
                  <svg className="w-5 h-5 ml-auto text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="w-full mt-6 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {t('languageModal.confirm')}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal {
          animation: modalSlideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default LanguageModal;
