import { IUserInput } from '&/application/dtos/users/users.dto';
import userSchema from './user.zod';

export const createUserEntity = (user: IUserInput): IUserInput => {
  userSchema.parse(user);
  return user;
};
