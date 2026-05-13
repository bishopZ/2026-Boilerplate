# Security Headers

This document describes the HTTP security response headers configured in the boilerplate, the rationale for each choice, and how to customize them.

All headers are applied globally via `src/server/middleware/security-headers.ts` using [Helmet 8](https://helmetjs.github.io/) plus a manual `Permissions-Policy` middleware. The middleware runs **before** all routes so that every response — HTML pages, JSON API responses, redirects, and static assets — carries the full header set.

Header choices follow the [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/) and 2026 [HttpFixer Security Headers changelog](https://httpfixer.dev/changelog/http-security-headers-2026/).

---

## Active headers

### Content-Security-Policy (CSP)

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'inline-speculation-rules';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self' data:;
  connect-src 'self';
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests  (production only)
```

Key decisions:

- **`script-src 'self' 'inline-speculation-rules'`** — The `'inline-speculation-rules'` CSP3 keyword allows `<script type="speculationrules">` blocks without enabling arbitrary inline JavaScript (`'unsafe-inline'`). All other scripts load from same origin. The speculation rules fallback script for older browsers was extracted to `public/js/speculation-rules-fallback.js` so it can be served from `'self'` with no inline JS.
- **`style-src 'unsafe-inline'`** — Required because Chakra UI uses Emotion (a CSS-in-JS runtime) which injects styles dynamically at runtime. There is no CSR-compatible way to avoid `'unsafe-inline'` for styles with Emotion without switching to a build-time CSS solution.
- **`frame-ancestors 'none'`** — Prevents the app from being embedded in any frame. This supersedes `X-Frame-Options` in browsers with CSP level 2 support. `X-Frame-Options: DENY` is retained for legacy browser coverage.
- **`upgrade-insecure-requests`** — Only emitted in production to avoid breaking local HTTP-only dev servers.

To customize the CSP (e.g. to allow an external CDN), edit `cspDirectives` in `src/server/middleware/security-headers.ts`.

### Strict-Transport-Security (HSTS)

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

- 2-year `max-age` per the OWASP HSTS Cheat Sheet recommendation (minimum for [HSTS preload list](https://hstspreload.org/) is 1 year).
- **Production only.** In development the header is suppressed so browsers are not locked into HTTPS on HTTP-only local servers.
- `preload` is included so the domain can be submitted to the HSTS preload list. Do not include this if you are not ready to commit all subdomains to HTTPS indefinitely.

### Referrer-Policy

```
Referrer-Policy: strict-origin-when-cross-origin
```

Sends only the origin (not path or query string) to cross-origin destinations, and the full URL to same-origin destinations. OWASP recommends this over `no-referrer` (Helmet's default) because it preserves useful referrer data for analytics/logging while preventing sensitive URL parameters from leaking cross-origin.

### X-Content-Type-Options

```
X-Content-Type-Options: nosniff
```

Prevents browsers from MIME-sniffing responses away from the declared `Content-Type`. Guards against content injection attacks where an attacker uploads a file that a browser might execute as HTML or JavaScript.

### X-Frame-Options

```
X-Frame-Options: DENY
```

Legacy clickjacking protection for browsers that predate CSP. Modern browsers use `frame-ancestors 'none'` from the CSP header above instead.

### Cross-Origin-Opener-Policy (COOP)

```
Cross-Origin-Opener-Policy: same-origin
```

Isolates the browsing context so cross-origin windows cannot access this window's DOM via `window.opener`. Protects against Spectre-style side-channel attacks and cross-origin information leakage.

### Cross-Origin-Resource-Policy (CORP)

```
Cross-Origin-Resource-Policy: same-origin
```

Prevents cross-origin pages from loading this server's resources (scripts, images, etc.) without explicit CORS permission. All resources in this boilerplate are served from the same origin, so `same-origin` is appropriate.

### Cross-Origin-Embedder-Policy (COEP)

```
Cross-Origin-Embedder-Policy: require-corp
```

- **Production only.** Requires all sub-resources to have either a CORP or CORS header. This is the prerequisite for enabling `SharedArrayBuffer` and high-precision timers in the browser.
- Suppressed in development because Vite's HMR WebSocket uses a cross-origin connection that does not carry a CORP header.

### Permissions-Policy

```
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=(), attribution-reporting=()
```

Disables browser feature APIs the app does not use. Limits the blast radius of an XSS attack by preventing injected code from accessing camera, microphone, location, or payment APIs. Also opts out of ad-tracking APIs (`browsing-topics`, `interest-cohort`, `attribution-reporting`).

To enable a feature for your app, remove it from the list or change its value (e.g. `geolocation=(self)` to allow self-origin access).

### X-DNS-Prefetch-Control

```
X-DNS-Prefetch-Control: off
```

Disables automatic DNS prefetch on links, reducing information leakage to third-party DNS servers.

---

## Removed / not set

| Header | Status | Reason |
|--------|--------|--------|
| `X-Powered-By` | Removed | Helmet's `hidePoweredBy` strips it. Leaks server tech stack. |
| `X-XSS-Protection` | Explicitly set to `0` | Deprecated; removed from Chrome 78+ and all modern browsers. A strict CSP is the correct replacement. Sending `1; mode=block` can create vulnerabilities on older browsers. |
| `Expect-CT` | Not set | Deprecated June 2021; browsers enforce CT automatically. |
| `Public-Key-Pins (HPKP)` | Not set | Removed from all browsers. Was removed after causing permanent site lockouts. |

---

## HTML meta-tag policy notes

Previous versions of this boilerplate used `<meta http-equiv="...">` tags in `index.html` for `X-Content-Type-Options`, `X-Frame-Options`, and a minimal CSP. These have been removed in favour of proper HTTP response headers:

- HTTP headers apply to **all** responses (API routes, redirects, static assets) — meta tags only apply to the HTML document they appear in.
- CSP via HTTP header supports the full directive set; meta CSP does not support `frame-ancestors`, `sandbox`, or `report-uri`.

---

## Testing

A Playwright E2E test at `playwright/e2e/security/security-headers.spec.ts` verifies that required headers are present on HTML, API, and static asset responses.

---

## Further hardening

- **CSP script nonces** — For a fully strict CSP without `'inline-speculation-rules'`, generate a per-request nonce, inject it via the Vite HTML transform hook, and add it to `script-src`. This requires SSR or a custom HTML injection step.
- **CSP reporting** — Add `report-uri` or `report-to` to collect CSP violation reports in production.
- **HSTS preload** — Submit the domain to [hstspreload.org](https://hstspreload.org/) after verifying all subdomains support HTTPS.
- **Style nonces (Emotion)** — Emotion supports style nonces via the `nonce` prop on `<CacheProvider>`, but this requires server-side rendering of the initial HTML to inject the nonce. Not supported in pure CSR mode.
