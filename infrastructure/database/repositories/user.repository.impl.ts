import { UserRepository } from '../../../domain/user/user.repository';
import { IUserInput, IUserDB } from '../../../application/dtos/users.dto';
import { UserModel } from '../models/user.model';

export const userRespository: UserRepository = {
  async create(user: IUserInput): Promise<IUserDB> {
    const newUser = await UserModel.create(user);
    return newUser.toJSON() as IUserDB;
  },
  async findByEmailAndUsername(email: string, username: string): Promise<IUserDB | null> {
    const user = await UserModel.findOne({ where: { email, username } });
    return user;
  },
};
