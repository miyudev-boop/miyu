import express, { Request, Response, NextFunction } from 'express';
import client, { Registry, collectDefaultMetrics, Counter, Histogram } from 'prom-client';

class MetricsService {
  private static instance: MetricsService | null = null;
  private register: Registry;
  private requestCounter: Counter<string>;
  private responseTimeHistogram: Histogram<string>;

  private constructor() {
    // Initialize a new Prometheus Registry
    this.register = new Registry();

    // Collect default system metrics (CPU, Memory, etc.)
    collectDefaultMetrics({ register: this.register });

    // Counter to track API requests
    this.requestCounter = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.register],
    });

    // Histogram to measure response times
    this.responseTimeHistogram = new Histogram({
      name: 'http_response_time_seconds',
      help: 'Histogram of HTTP response times in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.1, 0.5, 1, 2, 5], // Buckets for response times
      registers: [this.register],
    });
  }

  /**
   * Get the singleton instance of MetricsService.
   */
  public static getInstance(): MetricsService {
    if (!MetricsService.instance) {
      MetricsService.instance = new MetricsService();
    }
    return MetricsService.instance;
  }

  /**
   * Middleware to collect request metrics.
   */
  public collectMetrics() {
    return (req: Request, res: Response, next: NextFunction): void => {
      const startTime = process.hrtime();

      res.on('finish', () => {
        const durationInSeconds = this.calculateDurationInSeconds(startTime);
        this.requestCounter.inc({
          method: req.method,
          route: req.route ? req.route.path : req.url,
          status_code: res.statusCode,
        });

        this.responseTimeHistogram.observe(
          {
            method: req.method,
            route: req.route ? req.route.path : req.url,
            status_code: res.statusCode,
          },
          durationInSeconds
        );
      });

      next();
    };
  }

  /**
   * Serve metrics in the Prometheus format.
   */
  public serveMetrics() {
    return async (_req: Request, res: Response): Promise<void> => {
      try {
        const metrics = await this.register.metrics();
        res.set('Content-Type', this.register.contentType);
        res.status(200).send(metrics);
      } catch (error) {
        res.status(500).send('Failed to collect metrics');
      }
    };
  }

  /**
   * Calculate duration in seconds from a high-resolution time array.
   */
  private calculateDurationInSeconds(startTime: [number, number]): number {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    return seconds + nanoseconds / 1e9;
  }
}

export default MetricsService;

