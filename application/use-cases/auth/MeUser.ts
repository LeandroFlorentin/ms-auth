import { decodedToken } from '&/shared';
import { IMeUser } from '../../dtos/auth/me.dto';
export const meUser = (token: string): IMeUser => {
  const decoded = decodedToken<IMeUser>(token);
  return decoded;
};
