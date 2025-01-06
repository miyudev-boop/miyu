import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { Logger } from '../../utils/logger';

/**
 * Middleware to validate incoming requests using `express-validator`.
 * @param validations An array of validation chains to apply.
 */
export const validateRequest = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Run all validations
      await Promise.all(validations.map((validation) => validation.run(req)));

      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        Logger.warn('Validation failed', { errors: errors.array() });
        return res.status(400).json({
          error: 'Validation error',
          details: errors.array(),
        });
      }

      next();
    } catch (error) {
      Logger.error('Unexpected error during validation', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};

