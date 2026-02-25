import crypto from 'crypto';
import type { RequestHandler } from 'express';

const CSRF_COOKIE_NAME = 'csrf-token';
const CSRF_FIELD_NAME = '_csrf';

/**
 * Double-submit cookie CSRF protection.
 *
 * Sets a random CSRF token in a non-httpOnly cookie (readable by
 * client JS to embed in forms). On unsafe methods (POST, PUT, etc.),
 * validates that the submitted form field matches the cookie value.
 *
 * An attacker's site cannot read the cookie (same-origin policy),
 * so they cannot include the matching form field in a forged request.
 *
 * The token is only generated when no valid token cookie exists,
 * preventing multi-tab race conditions where a new tab would
 * invalidate the token embedded in another tab's form.
 */
export const csrfProtection: RequestHandler = (req, res, next) => {
  const isUnsafeMethod = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);

  if (isUnsafeMethod) {
    const cookieToken = req.cookies?.[CSRF_COOKIE_NAME] as string | undefined;
    const formToken = (req.body as Record<string, unknown>)[CSRF_FIELD_NAME] as string | undefined;

    if (!cookieToken || !formToken || cookieToken !== formToken) {
      res.status(403).send('CSRF token validation failed');
      return;
    }
  }

  const existingToken = req.cookies?.[CSRF_COOKIE_NAME] as string | undefined;
  if (!existingToken) {
    const token = crypto.randomBytes(32).toString('hex');
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie(CSRF_COOKIE_NAME, token, {
      httpOnly: false,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
    });
  }

  next();
};
