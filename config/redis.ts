import { env } from '&/shared/env';

export const cacheCfg = {
  RD_PORT: Number(env('RD_PORT')) as number,
  RD_PASSWORD: env('RD_PASSWORD') as string,
  RD_HOST: env('RD_HOST') as string,
};
