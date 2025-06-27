import { Request, Response, NextFunction } from 'express';
import { APIError } from '&/shared';
import { RequestWithToken } from '&/types/express';

const tokenMiddleware = (req: RequestWithToken, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) throw new APIError(401, 'No se envio autorización.');
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') throw new APIError(401, 'Formato de token inválido.');
  if (!parts[1]) throw new APIError(401, 'No se envio token.');
  req.token = parts[1];
  next();
};

export default tokenMiddleware;
