import { Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const langs = [["en","English"],["hi","हिंदी"],["ta","தமிழ்"],["te","తెలుగు"],["bn","বাংলা"],["mr","मराठी"],["gu","ગુજરાતી"],["kn","ಕನ್ನಡ"]];

export default function LanguageSelector() {
  const { i18n: instance } = useTranslation();
  return (
    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
      <Globe2 size={17} className="text-govBlue"/>
      <select
        aria-label="Language"
        value={instance.language}
        onChange={e => {
          const next = e.target.value;
          if (next === "en" || next === "hi") i18n.changeLanguage(next);
          else { i18n.changeLanguage("en"); }
        }}
        className="bg-transparent border-0 focus:ring-0 cursor-pointer"
      >
        {langs.map(([v,l]) => <option value={v} key={v}>{l}</option>)}
      </select>
    </label>
  );
}
