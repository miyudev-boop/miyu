import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Validate required environment variables and provide default values if necessary.
 */
const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (value === undefined || value === '') {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable "${key}" is not defined.`);
  }
  return value;
};

export const Environment = {
  // Application
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  PORT: parseInt(getEnv('PORT', '3000'), 10),

  // Database
  DATABASE_URL: getEnv('DATABASE_URL'),

  // Authentication
  JWT_SECRET: getEnv('JWT_SECRET', 'default-secret'),
  JWT_EXPIRATION: getEnv('JWT_EXPIRATION', '1h'),

  // API Keys
  TWITTER_API_KEY: getEnv('TWITTER_API_KEY'),
  TWITTER_API_SECRET: getEnv('TWITTER_API_SECRET'),
  TWITTER_ACCESS_TOKEN: getEnv('TWITTER_ACCESS_TOKEN'),
  TWITTER_ACCESS_TOKEN_SECRET: getEnv('TWITTER_ACCESS_TOKEN_SECRET'),
  TELEGRAM_BOT_TOKEN: getEnv('TELEGRAM_BOT_TOKEN'),

  // Blockchain
  SOLANA_RPC_URL: getEnv('SOLANA_RPC_URL', 'https://api.mainnet-beta.solana.com'),
  SOLANA_WALLET_PRIVATE_KEY: getEnv('SOLANA_WALLET_PRIVATE_KEY'),

  // Miscellaneous
  LOG_LEVEL: getEnv('LOG_LEVEL', 'info'),
  PRISMA_CLIENT_ENGINE_TYPE: getEnv('PRISMA_CLIENT_ENGINE_TYPE', 'binary'),
};

