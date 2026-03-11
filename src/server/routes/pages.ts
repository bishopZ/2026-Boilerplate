import { Router, type RequestHandler } from 'express';
import { ROUTES } from '../config/constants';
import { getRedirectRule } from '../config/redirects';
import { ensureAuthenticated } from '../middleware/auth';
import { getSitemap } from '../controllers/sitemap';

const router = Router();
const passToVite: RequestHandler = (_req, _res, next) => {
  next();
};

router.use((req, res, next) => {
  const redirectRule = getRedirectRule(req.path);
  if (!redirectRule) {
    next();
    return;
  }

  const queryStart = req.originalUrl.indexOf('?');
  const query = queryStart >= 0 ? req.originalUrl.slice(queryStart) : '';
  res.redirect(redirectRule.status, `${redirectRule.to}${query}`);
});

// Sitemap route - must be before other routes
router.get(ROUTES.SITEMAP, getSitemap);

// Page routes - pass to Vite for rendering
// Public home page
router.get(ROUTES.HOME, passToVite);

// Login page (SPA)
router.get(ROUTES.LOGIN, passToVite);

// Protected product page
router.get(ROUTES.PRODUCT, ensureAuthenticated, passToVite);

export default router;

