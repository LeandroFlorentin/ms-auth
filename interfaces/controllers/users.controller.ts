import { Request, Response, NextFunction } from 'express';
import { createUser } from '&/application/use-cases/user/createUser';
import { userRepository } from '&/infrastructure/database/repositories/user.repository.impl';
import { IUserInput } from '&/application/dtos/users/users.dto';

export const createUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = (req.body as IUserInput) || {};
    const user = await createUser(userRepository, body);
    const { password, ...restUser } = user;
    res.status(201).json(restUser);
    return;
  } catch (error: any) {
    next(error);
  }
};
