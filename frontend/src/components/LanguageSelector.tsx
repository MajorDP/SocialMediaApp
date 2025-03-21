import { useState } from "react";
import i18n from "../i18n";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "bg", label: "Български", flag: "🇧🇬" },
];

function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    setSelectedLanguage(e.target.value);
  };

  return (
    <select
      className="absolute right-0  bg-gray-800 text-white py-2 px-4 m-1 rounded-lg shadow-lg cursor-pointer outline-none transition"
      value={selectedLanguage}
      onChange={handleChangeLanguage}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.label}
        </option>
      ))}
    </select>
  );
}

export default LanguageSelector;
