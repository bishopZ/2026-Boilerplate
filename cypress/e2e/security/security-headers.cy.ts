/**
 * Security Headers E2E tests
 *
 * Verifies that every response from the server carries the required HTTP security
 * headers per OWASP Secure Headers Project (2026) guidance.
 *
 * Tests run against three response types to ensure headers are applied globally:
 *  1. HTML page (the SPA shell served by Express + Vite)
 *  2. JSON API endpoint (authenticated; tested via direct request)
 *  3. A static asset (speculation-rules fallback JS)
 *
 * cy.request() is used instead of cy.visit() so we can inspect raw response headers.
 */

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

// These directives must be present in CSP regardless of environment.
const CSP_REQUIRED_DIRECTIVES = [
  "default-src 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
] as const;

const FORBIDDEN_HEADERS = [
  { name: 'x-powered-by', description: 'leaks server technology' },
  { name: 'x-xss-protection', description: 'deprecated XSS Auditor (removed from browsers)' },
] as const;

describe('Security Headers', () => {
  describe('HTML page response (GET /)', () => {
    let headers: Record<string, string>;

    before(() => {
      cy.request({ url: '/', failOnStatusCode: false }).then((response) => {
        headers = response.headers as Record<string, string>;
      });
    });

    REQUIRED_HEADERS.forEach(({ name, expected, description }) => {
      it(`sets ${name}: ${expected} (${description})`, () => {
        expect(headers[name], `${name} header`).to.include(expected);
      });
    });

    it('sets Content-Security-Policy with required directives', () => {
      const csp = headers['content-security-policy'];
      expect(csp, 'content-security-policy header').to.exist;
      CSP_REQUIRED_DIRECTIVES.forEach((directive) => {
        expect(csp, `CSP must contain "${directive}"`).to.include(directive);
      });
    });

    it('sets Permissions-Policy disabling sensitive browser features', () => {
      const pp = headers['permissions-policy'];
      expect(pp, 'permissions-policy header').to.exist;
      ['camera=()', 'microphone=()', 'geolocation=()', 'payment=()'].forEach((feature) => {
        expect(pp, `Permissions-Policy must disable ${feature}`).to.include(feature);
      });
    });

    FORBIDDEN_HEADERS.forEach(({ name, description }) => {
      it(`does not set ${name} (${description})`, () => {
        expect(headers[name], `${name} must not be present`).to.be.undefined;
      });
    });
  });

  describe('API response (GET /api/health or similar unauthenticated endpoint)', () => {
    let headers: Record<string, string>;

    before(() => {
      // Use login page as a representative non-HTML, redirect-based server response
      cy.request({ url: '/login', failOnStatusCode: false }).then((response) => {
        headers = response.headers as Record<string, string>;
      });
    });

    it('sets x-content-type-options on all server responses', () => {
      expect(headers['x-content-type-options']).to.equal('nosniff');
    });

    it('sets referrer-policy on all server responses', () => {
      expect(headers['referrer-policy']).to.include('strict-origin-when-cross-origin');
    });

    it('does not expose x-powered-by on any response', () => {
      expect(headers['x-powered-by']).to.be.undefined;
    });
  });

  describe('Static asset response (GET /js/speculation-rules-fallback.js)', () => {
    let headers: Record<string, string>;

    before(() => {
      cy.request({ url: '/js/speculation-rules-fallback.js', failOnStatusCode: false }).then(
        (response) => {
          headers = response.headers as Record<string, string>;
        }
      );
    });

    it('sets x-content-type-options nosniff on static assets', () => {
      expect(headers['x-content-type-options']).to.equal('nosniff');
    });

    it('does not expose x-powered-by on static asset responses', () => {
      expect(headers['x-powered-by']).to.be.undefined;
    });
  });
});
