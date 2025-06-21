import { Request, Response, NextFunction } from 'express';
import { createUser } from '../../application/use-cases/createUser';
import { userRespository } from '../../infrastructure/database/repositories/user.repository.impl';
import { IUserInput } from '../../application/dtos/users.dto';

export const createUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = (req.body as IUserInput) || {};
    const user = await createUser(userRespository, body);
    const { password, ...restUser } = user;
    res.status(201).json(restUser);
    return;
  } catch (error: any) {
    next(error);
  }
};
