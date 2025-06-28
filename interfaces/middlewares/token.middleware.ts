import { Response, NextFunction } from 'express';
import { APIError } from '&/shared';
import { RequestWithToken } from '&/types/express';
import buildLogger from '&/infrastructure/winston';

const logger = buildLogger('middlewareToken');

const tokenMiddleware = (req: RequestWithToken, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) {
    const message = 'No se envio autorización.';
    manageError(message);
  }
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    const message = 'Formato de token inválido.';
    manageError(message);
  }
  if (!parts[1]) {
    const message = 'No se envio token.';
    manageError(message);
  }
  req.token = parts[1];
  next();
};

function manageError(message: string): never {
  logger.error(message);
  throw new APIError(401, message);
}

export default tokenMiddleware;
