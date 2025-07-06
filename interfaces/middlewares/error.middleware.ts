import { Request, Response, NextFunction } from 'express';
import buildLogger from '&/infrastructure/logs';
import { isAxiosError } from 'axios';

const logger = buildLogger('middlewareError');

const jwtErrorNames = ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'];

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);

  if (jwtErrorNames.includes(err.name)) {
    res.status(401).json({
      errors: [err.message],
    });
    return;
  }

  if (isAxiosError(err)) {
    const status = err.response?.status || 500;
    const errors = err.response?.data || { errors: ['Error interno de servidor'] };
    res.status(status).json(errors);
  }

  const status = err.code || err.status || 500;
  let message = err.message || 'Internal Server Error';
  res.status(status).json({
    errors: [message],
  });
  return;
};
