import { UserRepository } from '../../domain/user/user.repository';
import { createUserEntity } from '../../domain/user/user';

export type Input = {
  email: string;
  username: string;
  password: string;
};

export const createUser = async (userRepo: UserRepository, input: Input) => {
  const userToCreate = createUserEntity(input);
  const savedUser = await userRepo.create(userToCreate);
  return savedUser;
};
