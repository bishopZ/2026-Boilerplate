import type { RequestHandler } from 'express';
import passport from 'passport';
import { LOGIN_PATH, HOME_PATH } from '../config/constants';

// Handle login POST request
export const postLogin: RequestHandler = (req, res, next) => {
  passport.authenticate('local', (error: unknown, user: Express.User | false) => {
    if (error) {
      next(error);
      return undefined;
    }
    if (!user) {
      res.redirect(LOGIN_PATH);
      return undefined;
    }

    req.logIn(user, error => {
      if (error) {
        next(error);
        return undefined;
      }
      res.redirect('/product'); // redirect to the product page
    });
  })(req, res, next);
};

// Handle logout
export const getLogout: RequestHandler = (req, res) => {
  req.logout(error => {
    if (error) {
      return res.status(500).send('Logout failed');
    }
    res.redirect(HOME_PATH);
  });
};

