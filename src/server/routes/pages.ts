import { Router } from 'express';
import { ensureAuthenticated } from '../middleware/auth';
import { getSitemap } from '../controllers/sitemap';

const router = Router();

// Sitemap route - must be before other routes
router.get('/sitemap.xml', getSitemap);

// Page routes - pass to Vite for rendering
// Public home page
router.get('/', (_, __, next) => {
  next(); // pass to Vite
});

// Login page (SPA)
router.get('/login', (_, __, next) => {
  next(); // pass to Vite
});

// Protected product page
router.get('/product', ensureAuthenticated, (_, __, next) => {
  next(); // pass to Vite
});

export default router;

