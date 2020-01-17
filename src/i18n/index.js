import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en_US from './locales/en_US';
import nl_NL from './locales/nl_NL';

const locales = {
  'en-US': en_US,
  'nl-NL': nl_NL,
};

// initialize i18n, get all namespaces from the default language
i18n
  .use(initReactI18next)
  .init({
    debug      : process.env.NODE_ENV === 'development',
    fallbackLng: 'en-US',
    lng        : 'en-US',
    ns         : Object.keys(locales['en-US']),
    defaultNS  : 'common',
    resources  : locales,
  });

export default i18n;
