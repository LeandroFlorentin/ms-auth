import { UserRepository } from '../../../domain/user/user.repository';
import { User } from '../../../domain/user/user';
import { UserModel, UserDB } from '../models/user.model';

export const userRespository: UserRepository = {
  async create(user: User): Promise<UserDB> {
    const newUser = await UserModel.create(user);
    return newUser.toJSON() as UserDB;
  },
};
