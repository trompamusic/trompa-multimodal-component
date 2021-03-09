import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import deepmerge from 'deepmerge';
import en_US from './locales/en_US';
import nl_NL from './locales/nl_NL';

const locales = {
  'en-US': en_US,
  'nl-NL': nl_NL,
};

// initialize i18n, get all namespaces from the default language
export const getI18n = customTranslations => {
  const i18nInstance = i18n.createInstance();

  customTranslations = customTranslations || {};

  i18nInstance
    .use(initReactI18next)
    .init({
      debug      : process.env.NODE_ENV === 'development',
      fallbackLng: 'en-US',
      lng        : 'en-US',
      ns         : Object.keys(locales['en-US']),
      defaultNS  : 'common',
      resources  : deepmerge(locales, customTranslations),
    });

  return i18nInstance;
};

export default i18n;
