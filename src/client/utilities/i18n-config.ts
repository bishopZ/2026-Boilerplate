import enMessages from '../locales/en.json';
import arMessages from '../locales/ar.json';
import frMessages from '../locales/fr.json';
import zhMessages from '../locales/zh.json';

export const SUPPORTED_LOCALES = ['en', 'ar', 'fr', 'zh'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE: SupportedLocale = 'en';

export const MESSAGES: Record<SupportedLocale, Record<string, string>> = {
  en: enMessages,
  ar: arMessages,
  fr: frMessages,
  zh: zhMessages,
};

export const RTL_LOCALES: ReadonlySet<SupportedLocale> = new Set(['ar']);
