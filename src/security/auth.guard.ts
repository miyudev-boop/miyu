import { Request, Response, NextFunction } from 'express';
import SecurityService from './SecurityService';

class AuthGuard {
  private static instance: AuthGuard | null = null;
  private securityService: SecurityService;

  private constructor() {
    this.securityService = SecurityService.getInstance();
  }

  /**
   * Get the singleton instance of AuthGuard.
   */
  public static getInstance(): AuthGuard {
    if (!AuthGuard.instance) {
      AuthGuard.instance = new AuthGuard();
    }
    return AuthGuard.instance;
  }

  /**
   * Middleware to ensure the user is authenticated.
   */
  public ensureAuthenticated() {
    return (req: Request, res: Response, next: NextFunction): void => {
      const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
      }

      const payload = this.securityService.verifyToken(token);
      if (!payload) {
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
      }

      // Attach the payload to the request object
      req.user = payload;
      next();
    };
  }

  /**
   * Middleware to enforce role-based access control.
   * @param allowedRoles Array of roles allowed to access the route.
   */
  public authorizeRoles(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      }

      const userRole = req.user.role;
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource' });
      }

      next();
    };
  }
}

export default AuthGuard;

