import { type ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { type RootState } from '../redux/store';
import { DEFAULT_LOCALE, MESSAGES, RTL_LOCALES } from './i18n-config';

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const locale = useSelector((state: RootState) => state.preferences.locale);
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
