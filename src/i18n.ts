import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './translationLang.json'; // Import the JSON file

i18n.use(initReactI18next).init({
  lng: 'en', // Default language
  fallbackLng: 'en',
});

// Type the keys as keyof translations
(Object.keys(translations) as (keyof typeof translations)[]).forEach((key) => {
  i18n.addResourceBundle('en', 'translation', { [key]: translations[key][0] });
  i18n.addResourceBundle('he', 'translation', { [key]: translations[key][1] });
});

export default i18n;
