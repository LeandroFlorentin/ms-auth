import { IUserDB } from '../cache/cache.types';

export default interface IMsUserRepository {
  getUserByMsUsers: (username: string) => Promise<IUserDB | null>;
}
