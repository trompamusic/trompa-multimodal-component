import i18n from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import 'moment/locale/en-gb';

const locales = {
  en_US: require('./locales/en_US').default,
  nl_NL: require('./locales/nl_NL').default,
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

// change moment language on i18next languageChange event
i18n.on('languageChanged', language => moment.locale(language));

// set initial moment language
moment.locale(i18n.language);

export default i18n;
