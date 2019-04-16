import i18n from 'i18next';
import moment from 'moment';
import nl from './locales/nl';
import 'moment/locale/nl';

// initialise i18n, get all namespaces from the default language
i18n
  .init({
    lng: 'nl',
    ns: Object.keys(nl),
    defaultNS: 'common',
    resources: {
      nl,
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
