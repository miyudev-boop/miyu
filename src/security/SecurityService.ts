import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

class SecurityService {
  private static instance: SecurityService | null = null;
  private jwtSecret: string;
  private saltRounds: number;

  private constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    this.jwtSecret = process.env.JWT_SECRET;
    this.saltRounds = 10; // Default salt rounds for bcrypt
  }

  /**
   * Get the singleton instance of SecurityService.
   */
  public static getInstance(): SecurityService {
    if (!SecurityService.instance) {
      SecurityService.instance = new SecurityService();
    }
    return SecurityService.instance;
  }

  /**
   * Generate a JWT token.
   */
  public generateToken(payload: object, expiresIn: string = '1h'): string {
    return jwt.sign(payload, this.jwtSecret, { expiresIn });
  }

  /**
   * Verify a JWT token.
   */
  public verifyToken(token: string): object | null {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (err) {
      return null;
    }
  }

  /**
   * Middleware to authenticate requests using JWT.
   */
  public authenticate() {
    return (req: Request, res: Response, next: NextFunction): void => {
      const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided' });
      }

      const payload = this.verifyToken(token);
      if (!payload) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }

      // Attach the payload to the request object
      req.user = payload;
      next();
    };
  }

  /**
   * Hash a password using bcrypt.
   */
  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Compare a password with a hashed password.
   */
  public async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export default SecurityService;

