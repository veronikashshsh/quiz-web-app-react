export type LanguageCode = 'en' | 'uk';

export interface Language {
  code: LanguageCode;
  label: string;
  short: string;
}