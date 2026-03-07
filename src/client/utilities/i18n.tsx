import { type ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { type RootState } from '../redux/store';
import enMessages from '../locales/en.json';
import arMessages from '../locales/ar.json';

export const SUPPORTED_LOCALES = ['en', 'ar'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE: SupportedLocale = 'en';

const MESSAGES: Record<SupportedLocale, Record<string, string>> = {
  en: enMessages,
  ar: arMessages,
};

const RTL_LOCALES: ReadonlySet<SupportedLocale> = new Set(['ar']);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const locale = useSelector((state: RootState) => state.player.locale);
  const messages = { ...MESSAGES[DEFAULT_LOCALE], ...MESSAGES[locale] };
  const dir = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';

  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale={DEFAULT_LOCALE}>
      <div dir={dir}>
        {children}
      </div>
    </IntlProvider>
  );
};
