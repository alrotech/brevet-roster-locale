
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';
import translationBE from './locales/be/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  },
  be: {
    translation: translationBE
  }
};

// Avoid initializing i18n during SSG
const isClient = typeof window !== 'undefined';

if (isClient) {
  i18n
    // detect user language
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next
    .use(initReactI18next)
    // init i18next
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false // not needed for react as it escapes by default
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage']
      }
    });
}

export default i18n;
