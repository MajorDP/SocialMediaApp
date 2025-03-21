import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInEng from "../locales/en/translation.json";
import translationsInBG from "../locales/bg/translation.json";

const resources = {
  en: {
    translation: translationsInEng,
  },
  bg: {
    translation: translationsInBG,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "it",
  debug: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  ns: "translation",
  defaultNs: "translation",
});

export default i18n;
