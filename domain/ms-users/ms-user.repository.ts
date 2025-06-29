import { IUserDB } from '../redis/redis.types';

export default interface IMsUserRepository {
  getUserByMsUsers: (username: string) => Promise<IUserDB>;
}
