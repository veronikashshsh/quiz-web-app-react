import { JSX, useState } from "react";
import { useTranslation } from "react-i18next";

import { FLAGS, LANGUAGES } from "../../constants/languages";
import type { LanguageCode } from "../../types/language";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const current = i18n.language || "uk";
  const selected = LANGUAGES.find((l) => l.code === current) || LANGUAGES[1];

  const handleSelect = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-centerbg-[#f8faff]">
      <div className="relative inline-block">
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex items-center gap-3 px-2 py-2 rounded-2xl transition-all duration-200 cursor-pointer
            ${open ? "bg-white shadow-sm" : "hover:bg-white/50"}`}
        >
          <span className="flex-shrink-0 flex items-center">
            {FLAGS[current.startsWith("en") ? "en" : "uk"]}
          </span>
          <span className="text-base text-[#1a1c1e]">{selected.short}</span>
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

            <div className="absolute left-0 mt-1 w-50 bg-white rounded-[24px] py-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] z-50 overflow-hidden border border-gray-50">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className="w-full flex items-center gap-3 px-4 py-4 transition-colors duration-150 hover:bg-gray-50 group"
                >
                  <span className="flex-shrink-0">{FLAGS[lang.code]}</span>
                  <span
                    className={`flex-1 text-left text-[14px] font-medium ${lang.code === current ? "text-gray-900" : "text-gray-700"}`}
                  >
                    {lang.label}
                  </span>
                  {lang.code === current && (
                    <svg
                      className="w-5 h-5 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
