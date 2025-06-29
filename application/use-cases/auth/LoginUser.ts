/* import { UserRepository } from '&/domain/user/user.repository'; */
import { APIError, comparePassword, generateToken } from '&/shared';
import { ILoginBody, ReturnLoginUser } from '../../dtos/auth/login.dto';
import IRedisRepository from '../../../domain/redis/redis.repository';
import IMsUserRepository from '&/domain/ms-users/ms-user.repository';
import { IUserDB } from '&/domain/redis/redis.types';

export const loginUser = async (msUserRepository: IMsUserRepository, redisRepository: IRedisRepository, body: ILoginBody): Promise<ReturnLoginUser> => {
  let user;

  let cachedUser = await redisRepository.getValue(body.username);

  if (cachedUser) user = JSON.parse(cachedUser) as IUserDB;
  else {
    let externalUser = await msUserRepository.getUserByMsUsers(body.username);
    redisRepository.setValue(externalUser.username, JSON.stringify(externalUser));
    user = externalUser;
  }

  if (!user) throw new APIError(400, `Usuario incorrecto`);

  const { password, ...restUser } = user;

  const isPasswordValid = await comparePassword(body.password, password);
  if (!isPasswordValid) throw new APIError(401, 'Contraseña incorrecta.');

  const token = generateToken(restUser);

  return { token };
};
