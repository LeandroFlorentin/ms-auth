import { Request, Response, NextFunction } from 'express';
import { userRepository } from '&/infrastructure/database/repositories/user.repository.impl';
import { ILoginBody } from '&/application/dtos/auth/login.dto';
import { meUser, loginUser } from '&/application/use-cases/auth';
import { RequestWithToken } from '&/types/express';

export const loginUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = req.body as ILoginBody;
    const token = await loginUser(userRepository, body);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const meUserHandler = async (req: RequestWithToken, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.token!;
    const decoded = meUser(token);
    res.status(200).json(decoded);
  } catch (error) {
    next(error);
  }
};
