import { UserRepository } from '../../../domain/user/user.repository';
import { APIError, comparePassword, generateToken } from '../../../shared';
import { LoginEntity } from '../../../domain/auth/auth';
import { ILoginBody } from '../../dtos/auth/login.dto';

export const loginUser = async (userRepo: UserRepository, body: ILoginBody) => {
  const sendBody = LoginEntity(body.username);

  const user = await userRepo.findByEmailAndUsername(sendBody);

  if (!user) throw new APIError(400, `Usuario incorrecto`);

  const { password, ...restUser } = user;

  const isPasswordValid = await comparePassword(body.password, password);
  if (!isPasswordValid) throw new APIError(401, 'Contraseña incorrecta.');

  const token = generateToken(restUser);

  return token;
};
