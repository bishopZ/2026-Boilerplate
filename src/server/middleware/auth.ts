import type { RequestHandler } from 'express';
import { LOGIN_PATH } from '../config/constants';
import { verifyToken } from '../services/jwt';

export const ensureAuthenticated: RequestHandler = (req, res, next) => {
  const token = req.cookies?.token as string | undefined;

  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      next();
      return undefined;
    }
  }

  res.redirect(LOGIN_PATH);
};
