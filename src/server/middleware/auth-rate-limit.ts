import rateLimit from 'express-rate-limit';
import { ROUTES } from '../config/constants';

const DEFAULT_LOGIN_WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_LOGIN_MAX_ATTEMPTS = 5;
const UNKNOWN_USER = 'unknown-user';
const TOO_MANY_ATTEMPTS_MSG = 'Too many login attempts. Please try again later.';

const parsePositiveInt = (rawValue: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt(rawValue ?? '', 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
};

const loginWindowMs = parsePositiveInt(
  process.env.LOGIN_RATE_LIMIT_WINDOW_MS,
  DEFAULT_LOGIN_WINDOW_MS
);
const loginMaxAttempts = parsePositiveInt(
  process.env.LOGIN_RATE_LIMIT_MAX_ATTEMPTS,
  DEFAULT_LOGIN_MAX_ATTEMPTS
);

const getUsernameRateLimitKey = (username: unknown): string => {
  if (typeof username !== 'string') {
    return UNKNOWN_USER;
  }
  const normalized = username.trim().toLowerCase();
  return normalized.length > 0 ? normalized : UNKNOWN_USER;
};

export const loginRateLimiter = rateLimit({
  windowMs: loginWindowMs,
  limit: loginMaxAttempts,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  // Include attempted username in the key to reduce lockout blast-radius.
  keyGenerator: (req) => `${req.ip ?? 'unknown-ip'}:${getUsernameRateLimitKey((req.body as { username?: unknown; }).username)}`,
  skipSuccessfulRequests: true,
  requestWasSuccessful: (_req, res) => {
    return res.statusCode === 302 && res.getHeader('location') === ROUTES.PRODUCT;
  },
  handler: (_req, res, _next, options) => {
    const message = typeof options.message === 'string'
      ? options.message
      : TOO_MANY_ATTEMPTS_MSG;
    res.status(options.statusCode).send(message);
  },
  message: TOO_MANY_ATTEMPTS_MSG,
});
