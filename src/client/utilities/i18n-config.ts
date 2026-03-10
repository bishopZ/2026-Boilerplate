import enMessages from '../locales/en.json';
import arMessages from '../locales/ar.json';
import frMessages from '../locales/fr.json';

export const SUPPORTED_LOCALES = ['en', 'ar', 'fr'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE: SupportedLocale = 'en';

export const MESSAGES: Record<SupportedLocale, Record<string, string>> = {
  en: enMessages,
  ar: arMessages,
  fr: frMessages,
};

export const RTL_LOCALES: ReadonlySet<SupportedLocale> = new Set(['ar']);
