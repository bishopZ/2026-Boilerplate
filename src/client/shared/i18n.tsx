import { type ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { type RootState } from '../components/data/store';
import enMessages from '../locales/en.json';
import arMessages from '../locales/ar.json';

const MESSAGES: Record<string, Record<string, string>> = {
  en: enMessages,
  ar: arMessages,
};

const RTL_LOCALES = new Set(['ar', 'he', 'fa', 'ur']);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const locale = useSelector((state: RootState) => state.player.locale);
  const messages = MESSAGES[locale] ?? MESSAGES.en;
  const dir = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';

  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <div dir={dir}>
        {children}
      </div>
    </IntlProvider>
  );
};
