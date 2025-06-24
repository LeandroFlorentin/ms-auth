import { UserRepository } from '../../../domain/user/user.repository';
import { APIError, verifyEmail, comparePassword, generateToken } from '../../../shared';
import { ILoginBody } from '../../dtos/auth/login.dto';

export const loginUser = async (userRepo: UserRepository, body: ILoginBody) => {
  const isEmail = verifyEmail(body.username);

  const sendBody = isEmail ? { email: body.username } : { username: body.username };

  const user = await userRepo.findByEmailAndUsername(sendBody);

  if (!user) throw new APIError(400, `Usuario incorrecto`);

  const { password, ...restUser } = user;

  const isPasswordValid = await comparePassword(body.password, password);
  if (!isPasswordValid) throw new APIError(401, 'Contraseña incorrecta.');

  const token = generateToken(restUser);

  return token;
};
