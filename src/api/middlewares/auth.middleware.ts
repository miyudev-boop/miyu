import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Logger } from '../../utils/logger';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// Middleware to authenticate requests using JWT
export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      Logger.warn('Missing or malformed authorization header');
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      Logger.warn('No token found in authorization header');
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      Logger.error('JWT_SECRET is not defined in the environment variables');
      return res.status(500).json({ error: 'Internal server error' });
    }

    const decoded = jwt.verify(token, secretKey) as { id: string; email: string };
    req.user = { id: decoded.id, email: decoded.email };

    Logger.info(`User authenticated: ${decoded.id}`);
    next();
  } catch (error) {
    Logger.error('Authentication failed', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

