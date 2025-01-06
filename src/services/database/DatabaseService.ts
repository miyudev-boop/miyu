import { PrismaClient } from '@prisma/client';

class DatabaseService {
  private static instance: DatabaseService | null = null;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();

    // Log queries in development mode for debugging
    if (process.env.NODE_ENV === 'development') {
      this.prisma.$on('query', (e) => {
        console.log(`Query: ${e.query}`);
        console.log(`Params: ${e.params}`);
        console.log(`Duration: ${e.duration}ms`);
      });
    }
  }

  /**
   * Get the singleton instance of DatabaseService.
   */
  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  /**
   * Get the Prisma Client instance.
   */
  public getClient(): PrismaClient {
    return this.prisma;
  }

  /**
   * Gracefully disconnect the Prisma Client.
   */
  public async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }

  /**
   * Perform a health check to verify the database connection.
   */
  public async healthCheck(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database connection error:', error);
      return false;
    }
  }
}

export default DatabaseService;

