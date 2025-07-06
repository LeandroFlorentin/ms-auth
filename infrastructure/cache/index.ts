import Redis from 'ioredis';
import { cacheCfg } from '&/config';
const { RD_PASSWORD, RD_PORT, RD_HOST } = cacheCfg;

const cache = new Redis({
  port: RD_PORT,
  password: RD_PASSWORD,
  host: RD_HOST,
});

export default cache;
