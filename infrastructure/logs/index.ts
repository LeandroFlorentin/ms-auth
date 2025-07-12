import winston from 'winston';
const { combine, timestamp, json } = winston.format;

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [new winston.transports.File({ filename: `error.log`, level: 'error' }), new winston.transports.File({ filename: `combined.log`, level: 'info' })],
});

const buildLogger = (service: string): { log: (content: string | object) => void; error: (content: string | object) => void } => {
  return {
    log: (content: string | object) => logger.log('info', { content, service }),
    error: (content: string | object) => logger.error('error', { content, service }),
  };
};

export default buildLogger;
