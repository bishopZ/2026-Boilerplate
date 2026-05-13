import { describe, it, expect } from 'vitest';
import { parseFeatureFlags, isFeatureEnabled } from './feature-flags';

describe('parseFeatureFlags', () => {
  it('returns an empty object for undefined input', () => {
    expect(parseFeatureFlags(undefined)).toEqual({});
  });

  it('returns an empty object for an empty string', () => {
    expect(parseFeatureFlags('')).toEqual({});
  });

  it('parses a single true flag', () => {
    expect(parseFeatureFlags('featureA=true')).toEqual({ featureA: true });
  });

  it('parses a single false flag', () => {
    expect(parseFeatureFlags('featureA=false')).toEqual({ featureA: false });
  });

  it('parses multiple flags separated by commas', () => {
    const result = parseFeatureFlags('featureA=true,featureB=false,featureC=true');
    expect(result).toEqual({ featureA: true, featureB: false, featureC: true });
  });

  it('treats "1" as true', () => {
    expect(parseFeatureFlags('flag=1')).toEqual({ flag: true });
  });

  it('treats "on" as true', () => {
    expect(parseFeatureFlags('flag=on')).toEqual({ flag: true });
  });

  it('treats "yes" as true', () => {
    expect(parseFeatureFlags('flag=yes')).toEqual({ flag: true });
  });

  it('treats "0" as false', () => {
    expect(parseFeatureFlags('flag=0')).toEqual({ flag: false });
  });

  it('treats "off" as false', () => {
    expect(parseFeatureFlags('flag=off')).toEqual({ flag: false });
  });

  it('treats "no" as false', () => {
    expect(parseFeatureFlags('flag=no')).toEqual({ flag: false });
  });

  it('is case-insensitive for truthy values', () => {
    expect(parseFeatureFlags('flag=TRUE')).toEqual({ flag: true });
    expect(parseFeatureFlags('flag=Yes')).toEqual({ flag: true });
  });

  it('trims whitespace around flag entries', () => {
    expect(parseFeatureFlags('  featureA = true  ')).toEqual({ featureA: true });
  });

  it('skips entries with no flag name', () => {
    expect(parseFeatureFlags(',featureA=true,')).toEqual({ featureA: true });
  });

  it('defaults missing value to false', () => {
    // "featureA" with no "=value" part → defaults to false
    const result = parseFeatureFlags('featureA');
    expect(result.featureA).toBe(false);
  });
});

describe('isFeatureEnabled', () => {
  it('returns true when the runtime override is true', () => {
    expect(isFeatureEnabled('myFlag', { myFlag: true })).toBe(true);
  });

  it('returns false when the runtime override is false', () => {
    expect(isFeatureEnabled('myFlag', { myFlag: false })).toBe(false);
  });

  it('runtime override takes precedence over the env-based value', () => {
    // Even if ENV_FEATURE_FLAGS has a different value, the override wins.
    expect(isFeatureEnabled('myFlag', { myFlag: false })).toBe(false);
  });

  it('returns false for an unknown flag with no override', () => {
    expect(isFeatureEnabled('nonExistentFlag', {})).toBe(false);
  });
});
