import { describe, it, expect } from 'vitest';
import { getRedirectRule } from './redirects';

describe('getRedirectRule', () => {
  it('returns the redirect rule for /privacy', () => {
    const rule = getRedirectRule('/privacy');
    expect(rule).toBeDefined();
    expect(rule?.to).toBe('/policies');
    expect(rule?.status).toBe(301);
  });

  it('returns the redirect rule for /terms', () => {
    const rule = getRedirectRule('/terms');
    expect(rule).toBeDefined();
    expect(rule?.to).toBe('/policies');
    expect(rule?.status).toBe(301);
  });

  it('returns undefined for an unknown path', () => {
    expect(getRedirectRule('/unknown-route')).toBeUndefined();
  });

  it('returns undefined for the home route', () => {
    expect(getRedirectRule('/')).toBeUndefined();
  });

  it('normalizes a trailing slash on the incoming path', () => {
    // /privacy/ should match the /privacy rule
    const rule = getRedirectRule('/privacy/');
    expect(rule).toBeDefined();
    expect(rule?.to).toBe('/policies');
  });

  it('does not strip the trailing slash from the root path', () => {
    // "/" is special — trailing-slash removal must not turn it into ""
    expect(getRedirectRule('/')).toBeUndefined();
  });
});
