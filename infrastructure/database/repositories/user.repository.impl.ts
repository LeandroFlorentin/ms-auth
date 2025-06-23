import { UserRepository } from '../../../domain/user/user.repository';
import { IUserInput, IUserDB, IUserFindByEmailAndUsername } from '../../../application/dtos/users.dto';
import { UserModel } from '../models/user.model';

export const userRepository: UserRepository = {
  async create(user: IUserInput): Promise<IUserDB> {
    const newUser = await UserModel.create(user);
    return newUser.toJSON() as IUserDB;
  },
  async findByEmailAndUsername(body: IUserFindByEmailAndUsername): Promise<IUserDB | null> {
    const user = await UserModel.findOne({ where: { ...body } });
    return user;
  },
};
