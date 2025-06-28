import { Request, Response, NextFunction } from 'express';
import { createUser } from '&/application/use-cases/user/createUser';
import { userRepository } from '&/infrastructure/database/repositories/user.repository.impl';
import { IUserInput } from '&/application/dtos/users/users.dto';
import buildLogger from '&/infrastructure/winston';

const logger = buildLogger('users');

export const createUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = (req.body as IUserInput) || {};
    const user = await createUser(userRepository, body);
    const { password, ...restUser } = user;
    logger.log(restUser);
    res.status(200).json(restUser);
    return;
  } catch (error: any) {
    next(error);
  }
};
