import { UserRepository } from '../../../domain/user/user.repository';
import { createUserEntity } from '../../../domain/user/user';
import { IUserInput } from '../../dtos/users/users.dto';
import { APIError, hashPassword } from '../../../shared';

export const createUser = async (userRepo: UserRepository, body: IUserInput) => {
  const userToCreate = createUserEntity(body);

  const existingUser = await userRepo.findByEmailAndUsername({ email: userToCreate.email, username: userToCreate.username });
  if (existingUser) throw new APIError(400, 'El usuario ya existe con el email o nombre de usuario proporcionado.');

  userToCreate.password = await hashPassword(userToCreate.password);

  const savedUser = await userRepo.create(userToCreate);

  return savedUser;
};
