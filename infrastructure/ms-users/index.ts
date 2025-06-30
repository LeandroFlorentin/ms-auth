import axios from 'axios';
import { IUserDB } from '&/domain/redis/redis.types';
import { msUsers } from '&/config';
import buildLogger from '../winston';
const { URL } = msUsers;

const logger = buildLogger('ms-users');

const instance = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const msUserRepository = {
  getUserByMsUsers: async (username: string): Promise<IUserDB> => {
    const response = (await instance.get(`/users/get_by_username?username=${username}`)) as { data: IUserDB };
    return response.data;
  },
};
