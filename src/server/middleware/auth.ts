import type { RequestHandler, Request } from 'express';
import { API_PREFIX, ROUTES } from '../config/constants';
import { API_ERRORS } from '../config/api-error';
import { verifyToken, type JwtPayload } from '../services/jwt';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const ensureAuthenticated: RequestHandler = (req, res, next) => {
  const token = req.cookies?.token as string | undefined;

  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      (req as AuthenticatedRequest).user = payload;
      next();
      return undefined;
    }
  }

  if (req.path.startsWith(API_PREFIX)) {
    const error = API_ERRORS.unauthorized();
    res.status(error.status).json(error);
    return undefined;
  }

  res.redirect(ROUTES.LOGIN);
};
