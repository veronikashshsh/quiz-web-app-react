import { JSX } from "react";
import { Language, LanguageCode } from "../types/language";

export const FLAGS: Record<LanguageCode, JSX.Element> = {
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


export const LANGUAGES: Language[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "uk", label: "Українська", short: "UA" },
];