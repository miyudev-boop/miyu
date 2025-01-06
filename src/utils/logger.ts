import winston from 'winston';

/**
 * Logger utility to manage application-wide logging.
 */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;
      if (Object.keys(meta).length) {
        log += ` | Meta: ${JSON.stringify(meta)}`;
      }
      return log;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

/**
 * Stream object for integrating with other libraries (e.g., Morgan for HTTP logging).
 */
export const loggerStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export default logger;

/**
 * Example Usage
 *
 * logger.info('Application started');
 * logger.warn('This is a warning message');
 * logger.error('This is an error message', { errorDetails: { code: 500 } });
 */
