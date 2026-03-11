import type { RequestHandler, CookieOptions } from 'express';
import passport from 'passport';
import { ROUTES } from '../config/constants';
import { signToken } from '../services/jwt';

interface AuthUser {
  name: string;
  email: string;
}

const TOKEN_COOKIE_NAME = 'token';
const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

const getCookieOptions = (): CookieOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: ROUTES.HOME,
  };
};

const authenticateUser = (
  req: Parameters<RequestHandler>[0],
  res: Parameters<RequestHandler>[1],
  next: Parameters<RequestHandler>[2],
  onSuccess: (user: AuthUser) => void,
  onFailure: () => void
) => {
  passport.authenticate('local', (error: unknown, user: AuthUser | false) => {
    if (error) {
      next(error);
      return undefined;
    }
    if (!user) {
      onFailure();
      return undefined;
    }
    onSuccess(user);
  })(req, res, next);
};

const createSession = (res: Parameters<RequestHandler>[1], user: AuthUser) => {
  const token = signToken({ email: user.email, name: user.name });

  res.cookie(TOKEN_COOKIE_NAME, token, {
    ...getCookieOptions(),
    maxAge: SESSION_MAX_AGE_MS,
  });
};

export const postLogin: RequestHandler = (req, res, next) => {
  authenticateUser(
    req,
    res,
    next,
    (user) => {
      createSession(res, user);
      res.redirect(ROUTES.PRODUCT);
    },
    () => {
      res.redirect(ROUTES.LOGIN);
    }
  );
};

export const postSession: RequestHandler = (req, res, next) => {
  authenticateUser(
    req,
    res,
    next,
    (user) => {
      createSession(res, user);
      res.status(201).json({
        user: {
          email: user.email,
          name: user.name,
        },
      });
    },
    () => {
      res.status(401).json({
        code: 'INVALID_CREDENTIALS',
        message: 'Incorrect username or password.',
        status: 401,
      });
    }
  );
};

export const deleteSession: RequestHandler = (_req, res) => {
  res.clearCookie(TOKEN_COOKIE_NAME, getCookieOptions());
  res.status(204).send();
};

export const getLogout: RequestHandler = (_req, res) => {
  res.clearCookie(TOKEN_COOKIE_NAME, getCookieOptions());
  res.redirect(ROUTES.HOME);
};
