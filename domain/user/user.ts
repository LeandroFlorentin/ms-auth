import { verifyBody, APIError, verifyEmail, verifyPassword } from '../../shared';
import { IUserInput } from '../../application/dtos/users.dto';

export const createUserEntity = (user: IUserInput): IUserInput => {
  const fieldsToVerify = ['email', 'username', 'password'];

  const isValid = verifyBody(user, fieldsToVerify);
  if (!isValid.boolean) throw new APIError(400, isValid.message);

  const isEmailValid = verifyEmail(user.email);
  if (!isEmailValid) throw new APIError(400, 'Formato de email inválido.');

  const isPasswordValid = verifyPassword(user.password);
  if (!isPasswordValid) throw new APIError(400, 'La contraseña debe tener al menos 8 caracteres, contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.');

  return user;
};
