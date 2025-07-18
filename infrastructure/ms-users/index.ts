import axios from 'axios';
import { IUserDB } from '&/domain/cache/cache.types';
import { msUsers } from '&/config';
const { URL } = msUsers;

const instance = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const msUserRepository = {
  getUserByMsUsers: async (username: string): Promise<IUserDB | null> => {
    const response = (await instance.get(`/users/get_by_username?username=${username}`)) as { data: IUserDB | null };
    return response.data;
  },
};
