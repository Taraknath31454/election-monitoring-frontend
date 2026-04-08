import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import bn from './locales/bn.json';
import te from './locales/te.json';
import ta from './locales/ta.json';
import kn from './locales/kn.json';
import mr from './locales/mr.json';
import pa from './locales/pa.json';
import or from './locales/or.json';

// Get saved language from localStorage or default to English
const savedLanguage = localStorage.getItem('ems_language') || 'en';

// Language configurations
export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
];

// i18next configuration with debug mode enabled for development
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      bn: { translation: bn },
      te: { translation: te },
      ta: { translation: ta },
      kn: { translation: kn },
      mr: { translation: mr },
      pa: { translation: pa },
      or: { translation: or },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    // Debug mode - check console for missing keys
    debug: true,
    // Detection configuration
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'ems_language',
    },
  });

// Function to change language and save to localStorage
export const changeLanguage = (langCode) => {
  // Validate language code exists
  const validLanguage = languages.find(l => l.code === langCode);
  if (!validLanguage) {
    console.warn(`Language code "${langCode}" not found. Using fallback.`);
    i18n.changeLanguage('en');
    localStorage.setItem('ems_language', 'en');
    return;
  }
  
  i18n.changeLanguage(langCode);
  localStorage.setItem('ems_language', langCode);
  console.log(`Language changed to: ${langCode}`);
};

// Function to check if it's the first visit
export const isFirstVisit = () => {
  return !localStorage.getItem('ems_language_selected');
};

// Function to mark language as selected
export const markLanguageAsSelected = () => {
  localStorage.setItem('ems_language_selected', 'true');
};

export default i18n;
