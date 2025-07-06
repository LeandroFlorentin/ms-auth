import cache from '&/infrastructure/cache';
import { IUserDB } from '&/domain/cache/cache.types';

export const cacheRepository = {
  setValue: async (key: string, value: string): Promise<string | null> => await cache.set(key, value),
  getValue: async (key: string): Promise<IUserDB | null> => {
    const user = await cache.get(key);
    return user ? (JSON.parse(user) as IUserDB) : null;
  },
};
