import type { User } from './user';

export interface UserRepository {
  create(user: User): Promise<User>;
}
