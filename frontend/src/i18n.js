import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import hi from "./locales/hi/translation.json";

const detectLanguage = () => {
  const saved = localStorage.getItem("fasalsathi-language");
  if (saved) return saved;
  const lang = (navigator.language || "en").toLowerCase();
  if (lang.startsWith("hi")) return "hi";
  return "en";
};

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, hi: { translation: hi } },
  lng: detectLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

i18n.on("languageChanged", lng => localStorage.setItem("fasalsathi-language", lng));
export default i18n;
