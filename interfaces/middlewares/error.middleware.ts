import { NextFunction, Request, Response } from 'express';
import buildLogger from '&/infrastructure/logs';
import { isAxiosError } from 'axios';
import { ErrorType } from '&/types/middlewares';

const logger = buildLogger('middlewareError');

const jwtErrorNames = ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'];

export const errorMiddleware = (
  err: ErrorType,
  _: Request,
  res: Response,
  __: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  logger.error(err.message);

  if (jwtErrorNames.includes(err.name)) {
    res.status(401).json({ errors: [err.message] });
    return;
  }

  if (isAxiosError(err)) {
    const status = err.response?.status || 500;
    const errors = err.response?.data || { errors: ['Error interno de servidor'] };
    res.status(status).json(errors);
    return;
  }

  const status = Number(err.code) || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ errors: [message] });
  return;
};
