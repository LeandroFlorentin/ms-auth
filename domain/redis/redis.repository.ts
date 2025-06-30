import { IUserDB } from './redis.types';

export default interface IRedisRepository {
  setValue: (key: string, value: string) => Promise<string | null>;
  getValue: (key: string) => Promise<IUserDB | null>;
}
