import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

export const generateToken = (payload: JWTPayload): string => {
  const options = {
    expiresIn: JWT_EXPIRE,
    issuer: 'restaurant-backend',
    audience: 'restaurant-app'
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'restaurant-backend',
      audience: 'restaurant-app'
    }) as JWTPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const refreshToken = (payload: JWTPayload): string => {
  // Remove exp, iat, iss, aud from payload to avoid conflicts
  const { id, email, role } = payload;
  return generateToken({ id, email, role });
};
