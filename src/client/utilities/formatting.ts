/**
 * Locale-aware formatting utilities.
 *
 * All formatters accept an optional locale parameter. When omitted,
 * they use the browser's default locale (which react-intl sets based
 * on the current IntlProvider locale).
 */

export const formatDate = (date: Date, locale?: string, options?: Intl.DateTimeFormatOptions): string =>
  new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(date);

export const formatNumber = (value: number, locale?: string, options?: Intl.NumberFormatOptions): string =>
  new Intl.NumberFormat(locale, options).format(value);

export const formatCurrency = (value: number, currency = 'USD', locale?: string): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
