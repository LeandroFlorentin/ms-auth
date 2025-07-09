import tokenMiddleware from '&/interfaces/middlewares/token.middleware';
import { APIError } from '&/shared/apiError';

describe('Test token middleware', () => {
  it('Lanza error si no se envia nada en el header', () => {
    const req = { headers: {} } as any;
    const res = {} as any;
    const next = jest.fn();
    try {
      tokenMiddleware(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(APIError);
      expect(error.message).toBe('Token no enviado.');
      expect(error.code).toBe(401);
    }
  });
  it('Lanza error si el formato del header es invalido', () => {
    const req = { headers: { authorization: 'Bearer' } } as any;
    const res = {} as any;
    const next = jest.fn();
    try {
      tokenMiddleware(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(APIError);
      expect(error.message).toBe('Formato de token inválido.');
      expect(error.code).toBe(401);
    }
  });
  it('Lanza error si el formato del header es invalido', () => {
    const req = { headers: { authorization: 'asdf asfdsfsdfds' } } as any;
    const res = {} as any;
    const next = jest.fn();
    try {
      tokenMiddleware(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(APIError);
      expect(error.message).toBe('Formato de token inválido.');
      expect(error.code).toBe(401);
    }
  });
  it('Lanza error si no se envia token', () => {
    const req = { headers: { authorization: 'Bearer ' } } as any;
    const res = {} as any;
    const next = jest.fn();
    try {
      tokenMiddleware(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(APIError);
      expect(error.message).toBe('Token no enviado.');
      expect(error.code).toBe(401);
    }
  });
});
