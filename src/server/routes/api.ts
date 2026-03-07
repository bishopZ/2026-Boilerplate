import { Router } from 'express';
import { API_PATHS } from '../config/constants';
import { getKey } from '../controllers/api';
import { ensureAuthenticated } from '../middleware/auth';

const router = Router();

// API routes - all require authentication
router.get(API_PATHS.KEY, ensureAuthenticated, getKey);

export default router;

