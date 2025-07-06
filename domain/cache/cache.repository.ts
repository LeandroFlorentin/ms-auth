import { IUserDB } from './cache.types';

export default interface ICacheRepository {
  setValue: (key: string, value: string) => Promise<string | null>;
  getValue: (key: string) => Promise<IUserDB | null>;
}
