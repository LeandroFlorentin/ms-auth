import { UserAttributes } from '../../infrastructure/database/models/user.model';

export interface IUserInput {
  email: string;
  username: string;
  password: string;
}

export interface IUserDB extends UserAttributes {}
