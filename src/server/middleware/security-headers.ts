import helmet from 'helmet';
import type { RequestHandler, Application } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Content Security Policy for a Vite/React SPA using Chakra UI (Emotion CSS-in-JS).
 *
 * Key design decisions:
 * - script-src (production): 'unsafe-inline' is intentionally omitted. The one inline
 *   script block in index.html uses type="speculationrules", which is permitted by the
 *   'inline-speculation-rules' CSP3 keyword without opening up arbitrary inline JS.
 *   All other scripts load from 'self'.
 * - script-src (development): Vite's HMR client injects an inline <script type="module">
 *   for the React fast-refresh hook, which requires 'unsafe-inline'. This relaxation
 *   is development-only; production builds bundle everything into external files.
 * - style-src: 'unsafe-inline' is required in both environments because Emotion
 *   (Chakra UI's CSS-in-JS runtime) injects styles dynamically at runtime with no
 *   nonce support in CSR mode.
 * - upgrade-insecure-requests is only emitted in production to avoid breaking HTTP-only
 *   local dev servers.
 * - frame-ancestors 'none' takes precedence over X-Frame-Options for browsers that
 *   support CSP level 2+; X-Frame-Options is kept for older browser coverage.
 */
const cspDirectives: helmet.ContentSecurityPolicyOptions['directives'] = {
  defaultSrc: ['\'self\''],
  scriptSrc: isProduction
    ? ['\'self\'', '\'inline-speculation-rules\'']
    : ['\'self\'', '\'unsafe-inline\''],
  styleSrc: ['\'self\'', '\'unsafe-inline\''],
  imgSrc: ['\'self\'', 'data:'],
  fontSrc: ['\'self\'', 'data:'],
  connectSrc: ['\'self\''],
  frameAncestors: ['\'none\''],
  objectSrc: ['\'none\''],
  baseUri: ['\'self\''],
  formAction: ['\'self\''],
  ...(isProduction && { upgradeInsecureRequests: [] }),
};

/**
 * Permissions-Policy header: disable browser features this app does not use.
 * This limits the blast radius of XSS by preventing injected scripts from
 * accessing sensitive APIs like camera, microphone, or location.
 *
 * Includes browsing-topics and attribution-reporting to opt out of ad-tracking
 * APIs per the OWASP / Privacy CG recommendation.
 */
const permissionsPolicyMiddleware: RequestHandler = (_req, res, next) => {
  res.setHeader(
    'Permissions-Policy',
    [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'interest-cohort=()',
      'browsing-topics=()',
      'attribution-reporting=()',
    ].join(', ')
  );
  next();
};

/**
 * Apply all security-related HTTP response headers to the Express app.
 *
 * Must be called before route registration so that every response —
 * including API routes, redirects, and static files — carries the headers.
 *
 * Uses Helmet 8 as the base, then adds Permissions-Policy manually
 * (not yet included in Helmet's default set).
 *
 * HSTS and COEP are production-only:
 * - HSTS requires HTTPS; enabling it over HTTP locks browsers out.
 * - COEP (require-corp) blocks cross-origin resources without explicit CORP
 *   headers; Vite's HMR WebSocket is cross-origin in dev and would be blocked.
 */
export const applySecurityHeaders = (app: Application): void => {
  app.use(
    helmet({
      contentSecurityPolicy: { directives: cspDirectives },

      // 2-year max-age per OWASP HSTS Cheat Sheet; satisfies preload list minimum (1 year).
      // Only sent over HTTPS (production) to avoid locking browsers into HTTPS on HTTP dev servers.
      strictTransportSecurity: isProduction
        ? { maxAge: 63072000, includeSubDomains: true, preload: true }
        : false,

      // OWASP recommends strict-origin-when-cross-origin (Helmet defaults to no-referrer).
      // This leaks only the origin (not path/query) to cross-origin navigations,
      // which keeps analytics/logging useful without exposing sensitive URL parameters.
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },

      // Prevent the server technology from being fingerprinted.
      hidePoweredBy: true,

      // COOP: prevent cross-origin windows from accessing this window via window.opener.
      crossOriginOpenerPolicy: { policy: 'same-origin' },

      // CORP: restrict cross-origin reads of same-origin resources.
      crossOriginResourcePolicy: { policy: 'same-origin' },

      // COEP: require CORP/CORS on all loaded resources.
      // Production-only; Vite HMR uses cross-origin WebSocket which would be blocked in dev.
      crossOriginEmbedderPolicy: isProduction ? { policy: 'require-corp' } : false,

      // X-Frame-Options: DENY as legacy fallback for browsers that predate CSP frame-ancestors.
      frameguard: { action: 'deny' },

      // Disable the deprecated XSS Auditor — use strict CSP instead (OWASP 2026 guidance).
      xssFilter: false,
    })
  );

  app.use(permissionsPolicyMiddleware);
};
