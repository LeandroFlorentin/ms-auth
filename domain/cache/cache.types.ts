export interface IUserDB {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date | null;
  isActive: boolean;
}
