/**
 * Security Headers E2E tests
 *
 * Verifies that every response from the server carries the required HTTP security
 * headers per OWASP Secure Headers Project (2026) guidance.
 *
 * Tests run against three response types to ensure headers are applied globally:
 *  1. HTML page (the SPA shell served by Express + Vite)
 *  2. A second server response (the /login route)
 *  3. A static asset (speculation-rules fallback JS)
 */

import { test, expect } from '@playwright/test';

const REQUIRED_HEADERS = [
  {
    name: 'x-content-type-options',
    expected: 'nosniff',
    description: 'prevents MIME-type sniffing',
  },
  {
    name: 'x-frame-options',
    expected: 'DENY',
    description: 'prevents clickjacking (legacy; CSP frame-ancestors is the primary control)',
  },
  {
    name: 'referrer-policy',
    expected: 'strict-origin-when-cross-origin',
    description: 'limits referrer leakage on cross-origin navigation',
  },
  {
    name: 'cross-origin-opener-policy',
    expected: 'same-origin',
    description: 'isolates browsing context, protects against Spectre-style attacks',
  },
  {
    name: 'cross-origin-resource-policy',
    expected: 'same-origin',
    description: 'prevents cross-origin reads of server resources',
  },
  {
    name: 'x-dns-prefetch-control',
    expected: 'off',
    description: 'disables DNS prefetch to reduce information leakage',
  },
] as const;

const CSP_REQUIRED_DIRECTIVES = [
  'default-src \'self\'',
  'frame-ancestors \'none\'',
  'object-src \'none\'',
  'base-uri \'self\'',
  'form-action \'self\'',
] as const;

const FORBIDDEN_HEADERS = [
  'x-powered-by',
  'x-xss-protection',
] as const;

test.describe('Security Headers', () => {
  test.describe('HTML page response (GET /)', () => {
    let headers: Record<string, string>;

    test.beforeAll(async ({ request }) => {
      const response = await request.get('/');
      headers = response.headers();
    });

    for (const { name, expected, description } of REQUIRED_HEADERS) {
      test(`sets ${name}: ${expected} (${description})`, () => {
        expect(headers[name], `${name} header`).toContain(expected);
      });
    }

    test('sets Content-Security-Policy with required directives', () => {
      const csp = headers['content-security-policy'];
      expect(csp).toBeTruthy();
      for (const directive of CSP_REQUIRED_DIRECTIVES) {
        expect(csp, `CSP must contain "${directive}"`).toContain(directive);
      }
    });

    test('sets Permissions-Policy disabling sensitive browser features', () => {
      const pp = headers['permissions-policy'];
      expect(pp).toBeTruthy();
      for (const feature of ['camera=()', 'microphone=()', 'geolocation=()', 'payment=()']) {
        expect(pp, `Permissions-Policy must disable ${feature}`).toContain(feature);
      }
    });

    for (const name of FORBIDDEN_HEADERS) {
      test(`does not set ${name}`, () => {
        expect(headers[name], `${name} must not be present`).toBeUndefined();
      });
    }
  });

  test.describe('Server response (GET /login)', () => {
    let headers: Record<string, string>;

    test.beforeAll(async ({ request }) => {
      const response = await request.get('/login');
      headers = response.headers();
    });

    test('sets x-content-type-options on all server responses', () => {
      expect(headers['x-content-type-options']).toBe('nosniff');
    });

    test('sets referrer-policy on all server responses', () => {
      expect(headers['referrer-policy']).toContain('strict-origin-when-cross-origin');
    });

    test('does not expose x-powered-by on any response', () => {
      expect(headers['x-powered-by']).toBeUndefined();
    });
  });

  test.describe('Static asset response (GET /js/speculation-rules-fallback.js)', () => {
    let headers: Record<string, string>;

    test.beforeAll(async ({ request }) => {
      const response = await request.get('/js/speculation-rules-fallback.js');
      headers = response.headers();
    });

    test('sets x-content-type-options nosniff on static assets', () => {
      expect(headers['x-content-type-options']).toBe('nosniff');
    });

    test('does not expose x-powered-by on static asset responses', () => {
      expect(headers['x-powered-by']).toBeUndefined();
    });
  });
});
