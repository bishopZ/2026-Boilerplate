import { describe, it, expect } from 'vitest';
import { formatDate, formatNumber, formatCurrency } from './formatting';

const LOCALE = 'en-US';
const FIXED_DATE = new Date('2026-05-13T12:00:00Z');

describe('formatDate', () => {
  it('returns a human-readable date string', () => {
    const result = formatDate(FIXED_DATE, LOCALE);
    // "May 13, 2026" in en-US
    expect(result).toBe('May 13, 2026');
  });

  it('overrides the default month style via options', () => {
    // formatDate spreads defaults (year, month: long, day) then applies options.
    // Providing month: 'short' overrides month but keeps the day default → "May 13, 2026".
    const result = formatDate(FIXED_DATE, LOCALE, { month: 'short' });
    expect(result).toBe('May 13, 2026');
  });

  it('handles a different locale', () => {
    // In fr-FR the month name is localised — just confirm it differs from en-US
    const enResult = formatDate(FIXED_DATE, LOCALE);
    const frResult = formatDate(FIXED_DATE, 'fr-FR');
    expect(frResult).not.toBe(enResult);
  });
});

describe('formatNumber', () => {
  it('formats an integer with no options', () => {
    expect(formatNumber(1234567, LOCALE)).toBe('1,234,567');
  });

  it('formats a decimal number', () => {
    expect(formatNumber(3.14159, LOCALE, { maximumFractionDigits: 2 })).toBe('3.14');
  });

  it('formats zero', () => {
    expect(formatNumber(0, LOCALE)).toBe('0');
  });

  it('formats negative numbers', () => {
    expect(formatNumber(-42, LOCALE)).toBe('-42');
  });
});

describe('formatCurrency', () => {
  it('formats a USD amount in en-US', () => {
    expect(formatCurrency(9.99, 'USD', LOCALE)).toBe('$9.99');
  });

  it('formats a EUR amount', () => {
    const result = formatCurrency(100, 'EUR', LOCALE);
    // en-US formats EUR as "€100.00" or "EUR 100.00" depending on runtime;
    // just confirm the numeric value and currency code are present.
    expect(result).toContain('100');
    expect(result.toLowerCase()).toMatch(/eur|€/);
  });

  it('defaults to USD when no currency argument is provided', () => {
    const withDefault = formatCurrency(50, undefined, LOCALE);
    const withExplicit = formatCurrency(50, 'USD', LOCALE);
    expect(withDefault).toBe(withExplicit);
  });
});
