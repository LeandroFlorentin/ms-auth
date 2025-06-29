import { Request, Response, NextFunction } from 'express';
import { ILoginBody } from '&/application/dtos/auth/login.dto';
import { meUser, loginUser } from '&/application/use-cases/auth';
import { RequestWithToken } from '&/types/express';
import buildLogger from '&/infrastructure/winston';
import { redisRepository } from '&/infrastructure/redis/repositories';
import { msUserRepository } from '&/infrastructure/ms-users';

const service = 'auth';

const logger = buildLogger(service);

export const loginUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = req.body as ILoginBody;
    const token = await loginUser(msUserRepository, redisRepository, body);
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
