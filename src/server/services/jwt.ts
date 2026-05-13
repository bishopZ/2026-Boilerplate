import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SESSION_SECRET ?? '';
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
