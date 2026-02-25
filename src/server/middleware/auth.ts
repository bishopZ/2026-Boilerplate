import type { RequestHandler, Request } from 'express';
import { LOGIN_PATH } from '../config/constants';
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

  res.redirect(LOGIN_PATH);
};
