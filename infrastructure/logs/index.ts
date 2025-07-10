import winston from 'winston';
const { combine, timestamp, json } = winston.format;

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [new winston.transports.File({ filename: `error.log`, level: 'error' }), new winston.transports.File({ filename: `combined.log`, level: 'info' })],
});

const buildLogger = (service: string): { log: (message: string | object) => void; error: (message: string | object) => void } => {
  return {
    log: (message: string | object) => logger.log('info', { message, service }),
    error: (message: string | object) => logger.error('error', { message, service }),
  };
};

export default buildLogger;
