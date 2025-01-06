import { PrismaClient } from '@prisma/client';
import { Logger } from '../utils/logger';
from eliza_framework import Eliza
from ar_framework import ARSession
import { MIYUARCompanion } from './path_to_file/MIYUARCompanion';

const prisma = new PrismaClient();

/**
 * Establishes a connection to the database and handles lifecycle events.
 */
export const initializeDatabase = async (): Promise<void> => {
  try {
    Logger.info('Connecting to the database...');
    await prisma.$connect();
    Logger.info('Database connection established successfully.');
  } catch (error) {
    Logger.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the application if the database connection fails
  }
};

/**
 * Gracefully closes the database connection.
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    Logger.info('Disconnecting from the database...');
    await prisma.$disconnect();
    Logger.info('Database disconnected successfully.');
  } catch (error) {
    Logger.error('Failed to disconnect from the database:', error);
  }
};

export default prisma;

