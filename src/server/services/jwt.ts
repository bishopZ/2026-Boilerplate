import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SESSION_SECRET ?? 'default-jwt-secret';
const JWT_EXPIRY = '24h';

export interface JwtPayload {
  email: string;
  name: string;
}

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
};
