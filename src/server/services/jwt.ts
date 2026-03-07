import jwt from 'jsonwebtoken';

const MIN_SECRET_LENGTH = 16;

const getJwtSecret = (): string => {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < MIN_SECRET_LENGTH || secret.includes('secret-here')) {
    throw new Error(
      'SESSION_SECRET is not configured securely. Set it in your .env file to a strong, random string '
      + `at least ${String(MIN_SECRET_LENGTH)} characters long (e.g. output of \`openssl rand -base64 32\`). `
      + 'Do NOT use the default value from .envTemplate.'
    );
  }
  return secret;
};

const JWT_SECRET = getJwtSecret();
const JWT_ALGORITHM = 'HS256' as const;
const JWT_EXPIRY = '24h';

export interface JwtPayload {
  email: string;
  name: string;
}

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: JWT_EXPIRY,
  });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: [JWT_ALGORITHM],
    }) as JwtPayload;
  } catch {
    return null;
  }
};
