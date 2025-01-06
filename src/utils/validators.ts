import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Utility function to validate request inputs and handle errors.
 * Throws a 400 Bad Request error if validation fails.
 */
export const validateInputs = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

/**
 * Validation rules for creating a new user.
 */
export const validateCreateUser = [
  body('username')
    .isString()
    .withMessage('Username must be a string')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters'),
  body('email')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

/**
 * Validation rules for user ID in the route parameters.
 */
export const validateUserId = [
  param('id')
    .isUUID()
    .withMessage('Invalid user ID format'),
];

/**
 * Validation rules for querying users.
 */
export const validateQueryUsers = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];


