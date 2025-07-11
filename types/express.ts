import { Request, Application } from 'express';
import { ILoginBody } from '&/application/dtos/auth/login.dto';

type TokenType = {
  token?: string;
};

type RequestExpress<Q, B> = Request<unknown, unknown, B, Q>;

export type RequestWithToken = RequestExpress<unknown, unknown> & TokenType;

export type RequestLoginUser = RequestExpress<unknown, ILoginBody>;

export { Application };
