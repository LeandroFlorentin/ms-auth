import Redis from 'ioredis';
import { redisCfg } from '&/config';
const { RD_PASSWORD, RD_PORT, RD_HOST } = redisCfg;

const redis = new Redis({
  port: RD_PORT,
  password: RD_PASSWORD,
  host: RD_HOST,
});

export default redis;
