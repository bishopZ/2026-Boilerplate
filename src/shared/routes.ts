export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PRODUCT: '/product',
  ABOUT: '/about',
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
