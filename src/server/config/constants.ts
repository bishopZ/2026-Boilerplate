export const DEFAULT_PORT = '3000';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PRODUCT: '/product',
  ABOUT: '/about',
  POLICIES: '/policies',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  LOGOUT: '/logout',
  SITEMAP: '/sitemap.xml',
} as const;

export const API_PATHS = {
  LOGIN: '/login/password',
  LOGOUT: '/logout',
  KEY: '/api/key',
} as const;

/** Path prefix for API routes (e.g. for error handling). */
export const API_PREFIX = '/api';

// encryption parameters
export const ITERATIONS = 100000;
export const KEY_LENGTH = 64;
export const DIGEST = 'sha512';

export const BASE = 10;
