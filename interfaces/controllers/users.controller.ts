import { Request, Response, NextFunction } from 'express';
import { createUser } from '../../application/use-cases/createUser';
import { userRespository } from '../../infrastructure/database/repositories/user.repository.impl';
import { User } from '../../domain/user/user';

export const createUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = req.body as User;
    const user = await createUser(userRespository, body);
    const { password, ...restUser } = user;
    res.status(201).json(restUser);
    return;
  } catch (error: any) {
    next(error);
  }
};
