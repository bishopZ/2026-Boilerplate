export const SUPPORTED_LOCALES = ['en', 'ar'] as const;

export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: SupportedLocale = 'en';
