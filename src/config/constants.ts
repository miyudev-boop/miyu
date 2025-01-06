// Application-wide constants
export const APP_NAME = 'Miyu';
export const APP_VERSION = '1.0.0';
export const DEFAULT_LANGUAGE = 'en';

// Environment-specific constants
export const ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';
export const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost:5432/miyu';

// API Response Messages
export const MESSAGES = {
  SUCCESS: 'Operation completed successfully.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access to this resource is forbidden.',
  NOT_FOUND: 'The requested resource could not be found.',
  VALIDATION_ERROR: 'There was a validation error with your request.',
  INTERNAL_SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
};

// User-related constants
export const USER = {
  DEFAULT_ROLE: 'user',
  ROLES: ['admin', 'user', 'moderator'],
  PASSWORD_MIN_LENGTH: 8,
};

// API Limits
export const API_LIMITS = {
  MAX_REQUESTS_PER_MINUTE: 60,
  MAX_REQUESTS_PER_HOUR: 1000,
};

// Third-party API endpoints
export const THIRD_PARTY_API = {
  OPENAI: {
    BASE_URL: 'https://api.openai.com/v1',
    MODELS: ['text-davinci-003', 'gpt-3.5-turbo'],
  },
  TWITTER: {
    BASE_URL: 'https://api.twitter.com/2',
  },
  TELEGRAM: {
    BASE_URL: 'https://api.telegram.org',
  },
};

// Blockchain-specific constants
export const SOLANA = {
  RPC_URL: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
  TRANSACTION_TIMEOUT: 30000, // in milliseconds
};

// Logging
export const LOGGING = {
  LEVEL: process.env.LOG_LEVEL || 'info',
  FORMAT: 'json',
};

// File upload limits (in bytes)
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5 MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'application/pdf'],
};

