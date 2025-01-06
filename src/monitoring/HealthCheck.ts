import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import axios from 'axios';

const prisma = new PrismaClient();

class HealthCheckService {
  /**
   * Check application status.
   */
  static getAppStatus(req: Request, res: Response): Response {
    return res.status(200).json({
      status: 'healthy',
      message: 'Application is running smoothly',
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Check database connection.
   */
  static async getDatabaseStatus(req: Request, res: Response): Promise<Response> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return res.status(200).json({
        status: 'healthy',
        message: 'Database connection is active',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'unhealthy',
        message: 'Database connection failed',
        error: error.message,
      });
    }
  }

  /**
   * Check external API connectivity.
   * @param url External API URL to check.
   */
  static async getExternalApiStatus(req: Request, res: Response): Promise<Response> {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        status: 'unhealthy',
        message: 'Invalid URL provided',
      });
    }

    try {
      const response = await axios.get(url);
      return res.status(response.status).json({
        status: 'healthy',
        message: `Successfully connected to ${url}`,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'unhealthy',
        message: `Failed to connect to ${url}`,
        error: error.message,
      });
    }
  }
}

export default HealthCheckService;

