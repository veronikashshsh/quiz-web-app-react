import { useState } from "react";
import { useTranslation } from "react-i18next";

const flags = {
  en: (
    <svg viewBox="0 0 60 30" className="w-6 h-4 rounded-sm shadow-sm">
      <clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath>
      <clipPath id="b"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath>
      <g clipPath="url(#a)">
        <path d="M0 0v30h60V0z" fill="#012169"/>
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
        <path d="M0 0l60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  ),
  uk: (
    <svg viewBox="0 0 60 30" className="w-6 h-4 rounded-sm shadow-sm">
      <rect width="60" height="15" fill="#005BBB"/>
      <rect y="15" width="60" height="15" fill="#FFD500"/>
    </svg>
  ),
};

const languages = [
  { code: "en", label: "English", short: "EN" },
  { code: "uk", label: "Українська", short: "UA" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const current = i18n.language || "uk"; 
  const selected = languages.find((l) => l.code === current) || languages[1];

  const handleSelect = (code) => {
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
            {flags[current.startsWith('en') ? 'en' : 'uk']}
          </span>
          <span className="text-base text-[#1a1c1e]">{selected.short}</span>
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            
            <div className="absolute left-0 mt-1 w-50 bg-white rounded-[24px] py-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] z-50 overflow-hidden border border-gray-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className="w-full flex items-center gap-3 px-4 py-4 transition-colors duration-150 hover:bg-gray-50 group"
                >
                  <span className="flex-shrink-0">
                    {flags[lang.code]}
                  </span>
                  <span className={`flex-1 text-left text-[14px] font-medium ${lang.code === current ? "text-gray-900" : "text-gray-700"}`}>
                    {lang.label}
                  </span>
                  {lang.code === current && (
                    <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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