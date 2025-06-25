import { ReturnLoginEntity } from '../../application/dtos/auth/login.dto';
import { z } from '../../infrastructure/zod/index';
import authSchema from './auth.zod';

export const LoginEntity = (username: string): ReturnLoginEntity => {
  const isEmail = z.string().email().safeParse(username).success;

  authSchema.parse({ username });

  const sendBody = isEmail ? { email: username } : { username: username };

  return sendBody;
};
