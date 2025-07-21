import { Dialect } from 'sequelize';
import { env } from '&/shared/env';

export const db = {
  DB_USER: env('DB_USER'),
  DB_PASSWORD: env('DB_PASSWORD'),
  DB_HOST: env('DB_HOST'),
  DB_DIALECT: env('DB_DIALECT') as Dialect,
  DB_NAME: env('DB_NAME'),
  DB_PORT: Number(env('DB_PORT')) as number,
};
