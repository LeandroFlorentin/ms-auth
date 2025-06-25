import { Request, Response, NextFunction } from 'express';
import { ZodError, manageMessageZod } from '../../infrastructure/zod/index';

const jwtErrorNames = ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'];

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (jwtErrorNames.includes(err.name)) {
    res.status(401).json({
      message: 'Token expirado',
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      message: manageMessageZod(err),
    });
    return;
  }

  const status = err.code || err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error',
  });
  return;
};
