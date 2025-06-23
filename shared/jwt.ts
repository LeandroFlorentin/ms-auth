import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config';

const JWT_SECRET = jwtConfig.JWT_SECRET;
const EXPIRATION_TIME = jwtConfig.EXPIRATION_TIME;

export const generateToken = (payload: object) => jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRATION_TIME });

export const decodedToken = (token: string) => jwt.decode(token, { complete: true });
