import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index'; // Adjust the import path as necessary

export class UserModel extends Model {}

export interface UserDB {
  id: number;
  email: string;
  username: string;
  password: string;
  role: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

UserModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.JSON, defaultValue: ['USER'] },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: null },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { sequelize, tableName: 'users', timestamps: false },
);
