import { IUserInput, IUserDB } from '../../application/dtos/users.dto';

export interface UserRepository {
  create(user: IUserInput): Promise<IUserDB>;
  findByEmailAndUsername(email: string, username: string): Promise<IUserDB | null>;
}
