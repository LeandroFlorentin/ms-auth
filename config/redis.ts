const { RD_PORT, RD_PASSWORD, RD_HOST } = process.env;

export const redisCfg = {
  RD_PORT: Number(RD_PORT) as number,
  RD_PASSWORD: RD_PASSWORD as string,
  RD_HOST: RD_HOST as string,
};
