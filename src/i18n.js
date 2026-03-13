import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import uk from './locales/uk.json';

i18n
  .use(LanguageDetector)      // автовизначення мови браузера
  .use(initReactI18next)      // підключення до React
  .init({
    resources: {
      en: { translation: en },
      uk: { translation: uk },
    },
    fallbackLng: 'en',        // якщо мову не знайдено — English
    detection: {
      // де зберігати вибір мови
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'], // запам'ятовує вибір після перезавантаження
    },
    interpolation: {
      escapeValue: false,     // React сам захищає від XSS
    },
  });

export default i18n;