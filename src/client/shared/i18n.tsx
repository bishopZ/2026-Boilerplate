import { type ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { type RootState } from '../components/data/store';
import { DEFAULT_LOCALE, type SupportedLocale } from './locales';
import enMessages from '../locales/en.json';
import arMessages from '../locales/ar.json';

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
