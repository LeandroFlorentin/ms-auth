import { UserRepository } from '../../domain/user/user.repository';
import { createUserEntity } from '../../domain/user/user';
import { IUserInput } from '../dtos/users.dto';
import { APIError, hashPassword } from '../../shared';

export const createUser = async (userRepo: UserRepository, body: IUserInput) => {
  const userToCreate = await createUserEntity(body);
  const savedUser = await userRepo.create(userToCreate);

  const existingUser = await userRepo.findByEmailAndUsername(savedUser.email, savedUser.username);
  if (existingUser) throw new APIError(400, 'El usuario ya existe con el email o nombre de usuario proporcionado.');

  savedUser.password = await hashPassword(savedUser.password);

  return savedUser;
};
