import { createRouter, createRoute, createRootRoute, lazyRouteComponent } from '@tanstack/react-router';
import App from './App';
import Home from './pages/Home';

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product',
  component: lazyRouteComponent(() => import('./pages/Product')),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: lazyRouteComponent(() => import('./pages/About')),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: lazyRouteComponent(() => import('./pages/Login')),
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: lazyRouteComponent(() => import('./pages/Privacy')),
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: lazyRouteComponent(() => import('./pages/Terms')),
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: lazyRouteComponent(() => import('./pages/NotFound')),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productRoute,
  aboutRoute,
  loginRoute,
  privacyRoute,
  termsRoute,
  notFoundRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
