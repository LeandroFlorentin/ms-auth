import { Request, Response, NextFunction } from 'express';
import { meUser, loginUser } from '&/application/use-cases/auth';
import { RequestWithToken, RequestLoginUser } from '&/types/express';
import buildLogger from '&/infrastructure/logs';
import { cacheRepository } from '&/infrastructure/cache/repositories';
import { msUserRepository } from '&/infrastructure/ms-users';

const service = 'auth';

const logger = buildLogger(service);

export const loginUserHandler = async (req: RequestLoginUser, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = await loginUser(msUserRepository, cacheRepository, req.body);
    logger.log(token);
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
};

export const meUserHandler = async (req: RequestWithToken, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.token!;
    const decoded = meUser(token);
    logger.log(decoded);
    res.status(200).json(decoded);
  } catch (error) {
    next(error);
  }
};
