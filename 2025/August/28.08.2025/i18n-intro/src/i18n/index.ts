import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/common.json";
import fr from "./locales/fr/common.json";
import ru from "./locales/ru/common.json";
import he from "./locales/he/common.json";

const resources = {
    en: { translation: en },
    fr: { translation: fr },
    ru: { translation: ru },
    he: { translation: he },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "he",
    fallbackLng: "ru",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;