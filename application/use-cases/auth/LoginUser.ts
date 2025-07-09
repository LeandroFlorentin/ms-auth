/* import { UserRepository } from '&/domain/user/user.repository'; */
import { APIError, comparePassword, generateToken } from '&/shared';
import { ILoginBody, ReturnLoginUser } from '../../dtos/auth/login.dto';
import ICacheRepository from '&/domain/cache/cache.repository';
import IMsUserRepository from '&/domain/ms-users/ms-user.repository';

export const loginUser = async (msUserRepository: IMsUserRepository, cacheRepository: ICacheRepository, body: ILoginBody): Promise<ReturnLoginUser> => {
  let user;

  let cachedUser = await cacheRepository.getValue(body.username);
  if (cachedUser) user = cachedUser;
  else {
    let externalUser = await msUserRepository.getUserByMsUsers(body.username);
    if (externalUser) {
      cacheRepository.setValue(externalUser.username, JSON.stringify(externalUser));
      cacheRepository.setValue(externalUser.email, JSON.stringify(externalUser));
      user = externalUser;
    }
  }

  if (!user) throw new APIError(401, `Usuario incorrecto.`);

  const { password, ...restUser } = user;

  const isPasswordValid = await comparePassword(body.password, password);
  if (!isPasswordValid) throw new APIError(401, 'Contraseña incorrecta.');

  const token = generateToken(restUser);

  return { token };
};
