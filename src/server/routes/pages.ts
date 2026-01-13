import { Router } from 'express';
import { ensureAuthenticated } from '../middleware/auth';

const router = Router();

// Page routes - pass to Vite for rendering
// Public home page
router.get('/', (_, __, next) => {
  next(); // pass to Vite
});

// Protected product page
router.get('/product', ensureAuthenticated, (_, __, next) => {
  next(); // pass to Vite
});

export default router;

