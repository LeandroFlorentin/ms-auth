import { cacheRepository } from '../repositories';
import { hashPassword } from '&/shared';

export const createUser = async (): Promise<void> => {
  const user = {
    id: 1,
    username: 'user_prueba',
    email: 'prueba@gmail.com',
    password: 'Prueba123$',
    role: ['ADMIN'],
    createdAt: new Date().toISOString(),
    updatedAt: null,
    isActive: true,
  };
  user.password = await hashPassword(user.password);
  const json_user = JSON.stringify(user);
  await cacheRepository.setValue(user.username, json_user);
  await cacheRepository.setValue(user.email, json_user);
};
