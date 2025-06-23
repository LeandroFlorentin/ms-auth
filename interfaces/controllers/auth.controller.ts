import { Request, Response, NextFunction } from 'express';
import { loginUser } from '../../application/use-cases/LoginUser';
import { userRepository } from '../../infrastructure/database/repositories/user.repository.impl';
import { ILoginBody } from '../../application/dtos/login.dto';

export const loginUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = req.body as ILoginBody;
    const token = await loginUser(userRepository, body);
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
};
