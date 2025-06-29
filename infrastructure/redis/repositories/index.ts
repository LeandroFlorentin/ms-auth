import redis from '&/infrastructure/redis';

export const redisRepository = {
  setValue: async (key: string, value: string): Promise<string | null> => await redis.set(key, value),
  getValue: async (key: string): Promise<string | null> => await redis.get(key),
};
