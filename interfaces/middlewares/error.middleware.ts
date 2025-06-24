import { Request, Response, NextFunction } from 'express';

const jwtErrorNames = ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'];

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (jwtErrorNames.includes(err.name)) {
    res.status(401).json({
      message: 'Token expirado',
    });
    return;
  }

  const status = err.code || err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error',
  });
  return;
};
