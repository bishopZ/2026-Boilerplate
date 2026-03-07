import { Router } from 'express';
import { ROUTES } from '../config/constants';
import { ensureAuthenticated } from '../middleware/auth';
import { getSitemap } from '../controllers/sitemap';

const router = Router();

// Sitemap route - must be before other routes
router.get(ROUTES.SITEMAP, getSitemap);

// Page routes - pass to Vite for rendering
// Public home page
router.get(ROUTES.HOME, (_, __, next) => {
  next(); // pass to Vite
});

// Login page (SPA)
router.get(ROUTES.LOGIN, (_, __, next) => {
  next(); // pass to Vite
});

// Protected product page
router.get(ROUTES.PRODUCT, ensureAuthenticated, (_, __, next) => {
  next(); // pass to Vite
});

export default router;

