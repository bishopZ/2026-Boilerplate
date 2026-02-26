import type { Request, Response, NextFunction } from 'express';
import { type ApiErrorResponse, API_ERRORS } from '../shared/api-error';

/**
 * Global error handler middleware.
 *
 * For API routes (/api/*): returns structured JSON error responses.
 * For page routes: redirects to home with a generic error.
 *
 * Must be registered LAST in the middleware chain (after all routes).
 */
export const globalErrorHandler = (
  err: ApiErrorResponse & Error,
  req: Request,
  res: Response,
  _next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  const status = err.status || 500;
  const message = err.message || 'An unexpected error occurred';

  console.error(`[${req.method}] ${req.path} — ${message}`);  

  if (req.path.startsWith('/api/')) {
    const response = err.code
      ? { status, code: err.code, message }
      : API_ERRORS.internal(message);

    res.status(response.status).json(response);
    return;
  }

  res.status(status).redirect('/');
};
