import { NextFunction, Request, Response } from '&/types/express';
import buildLogger from '&/infrastructure/logs';
import { isAxiosError } from 'axios';
import { ErrorType } from '&/types/middlewares';

const logger = buildLogger('middlewareError');

const isJwtError = (err: ErrorType) => ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'].includes(err.name);

export const errorMiddleware = (err: ErrorType, _: Request, res: Response, __: NextFunction) => {
  const status = Number(err.code) || 500;
  const message = err.message || 'Error interno de servidor.';

  logger.error(err.message);

  if (isJwtError(err)) {
    res.status(401).json({ errors: [err.message] });
    return;
  }

  if (isAxiosError(err)) {
    const status = err.response?.status || 500;
    const errors = err.response?.data || { errors: ['Error interno de servidor'] };
    res.status(status).json(errors);
    return;
  }

  res.status(status).json({ errors: [message] });
  return;
};
