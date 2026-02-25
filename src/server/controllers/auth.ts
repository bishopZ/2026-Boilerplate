import type { RequestHandler, CookieOptions } from 'express';
import passport from 'passport';
import { LOGIN_PATH, HOME_PATH } from '../config/constants';
import { signToken } from '../services/jwt';

interface AuthUser {
  name: string;
  email: string;
}

const TOKEN_COOKIE_NAME = 'token';

const getCookieOptions = (): CookieOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
  };
};

export const postLogin: RequestHandler = (req, res, next) => {
  passport.authenticate('local', (error: unknown, user: AuthUser | false) => {
    if (error) {
      next(error);
      return undefined;
    }
    if (!user) {
      res.redirect(LOGIN_PATH);
      return undefined;
    }

    const token = signToken({ email: user.email, name: user.name });

    res.cookie(TOKEN_COOKIE_NAME, token, {
      ...getCookieOptions(),
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect('/product');
  })(req, res, next);
};

export const getLogout: RequestHandler = (_req, res) => {
  res.clearCookie(TOKEN_COOKIE_NAME, getCookieOptions());
  res.redirect(HOME_PATH);
};
