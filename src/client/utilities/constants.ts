// The identifier used in local storage
export const LOCAL_STORAGE_ID = '2026-Boilerplate';

export const META = {
  PREVIEW_IMAGE: 'https://raw.githubusercontent.com/bishopz/2026-boilerplate/main/public/preview.png',
  FALLBACK: 'https://github.com/bishopz/2026-boilerplate',
  AUTHOR: 'BishopZ',
  KEYWORDS: 'boilerplate, react, node.js, express, typescript, local-first, encryption, authentication',
  LANGUAGE: 'English',
  REVISIT_AFTER: '7 days',
  GENERATOR: 'Vite',
  OG_TYPE: 'website',
  LOCALE: 'en_US',
  TWITTER_CARD: 'summary_large_image',
  TWITTER_SITE: '@bishopz',
  THEME_COLOR: '#ffffff',
  MOBILE_WEB_APP_CAPABLE: 'yes',
  APPLE_STATUS_BAR_STYLE: 'default',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PRODUCT: '/product',
  ABOUT: '/about',
  POLICIES: '/policies',
  LOGOUT: '/logout',
} as const;

export const API_PATHS = {
  LOGIN: '/login/password',
  LOGOUT: '/logout',
  KEY: '/api/key',
} as const;

