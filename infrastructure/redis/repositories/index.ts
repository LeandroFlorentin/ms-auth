import redis from '&/infrastructure/redis';
import { IUserDB } from '&/domain/redis/redis.types';

export const redisRepository = {
  setValue: async (key: string, value: string): Promise<string | null> => await redis.set(key, value),
  getValue: async (key: string): Promise<IUserDB | null> => {
    const user = await redis.get(key);
    return user ? (JSON.parse(user) as IUserDB) : null;
  },
};
