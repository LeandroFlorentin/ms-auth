import { verifyBody, APIError } from '../../shared';

export type User = {
  email: string;
  username: string;
  password: string;
};

export const createUserEntity = (user: User): User => {
  const fieldsToVerify = ['email', 'username', 'password'];

  const isValid = verifyBody(user, fieldsToVerify);
  if (!isValid.boolean) throw new APIError(400, isValid.message);

  const isEmailValid = verifyEmail(user.email);
  if (!isEmailValid) throw new APIError(400, 'Formato de email inválido.');

  const isPasswordValid = verifyPassword(user.password);
  if (!isPasswordValid) throw new APIError(400, 'La contraseña debe tener al menos 8 caracteres, contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.');

  return user;
};

const verifyEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const verifyPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
