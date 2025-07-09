import { Response, NextFunction } from 'express';
import { APIError } from '&/shared';
import { RequestWithToken } from '&/types/express';
import buildLogger from '&/infrastructure/logs';

const logger = buildLogger('middlewareToken');

const tokenMiddleware = (req: RequestWithToken, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header) manageError('Token no enviado.');

  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') manageError('Formato de token inválido.');

  if (!parts[1]) manageError('Token no enviado.');

  req.token = parts[1];
  next();
};

function manageError(message: string): never {
  logger.error(message);
  throw new APIError(401, message);
}

export default tokenMiddleware;
