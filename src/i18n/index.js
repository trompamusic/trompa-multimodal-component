import i18n from 'i18next';
import moment from 'moment';
import en from './locales/en';
import 'moment/locale/en-gb';

// initialise i18n, get all namespaces from the default language
i18n
  .init({
    lng: 'en',
    ns: Object.keys(en),
    defaultNS: 'common',
    resources: {
      en,
    },
    interpolation: {
      escapeValue: false,
    },
  });

// change moment language on i18next languageChange event
i18n.on('languageChanged', language => moment.locale(language));

// set initial moment language
moment.locale(i18n.language);

export default i18n;
