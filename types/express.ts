import { Request } from 'express';
import { ILoginBody } from '&/application/dtos/auth/login.dto';

export interface RequestWithToken extends Request {
  token?: string;
}

export interface RequestLoginUser extends Request {
  body: ILoginBody;
}
