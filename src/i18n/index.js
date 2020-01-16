import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en_US from './locales/en_US';
import nl_NL from './locales/nl_NL';

const locales = {
  en_US,
  nl_NL,
};

// initialize i18n, get all namespaces from the default language
i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en_US',
    lng        : 'en_US',
    ns         : Object.keys(locales.en_US),
    defaultNS  : 'common',
    resources  : locales,
  });

export default i18n;
