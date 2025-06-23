export const jwtConfig = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME as any,
};
