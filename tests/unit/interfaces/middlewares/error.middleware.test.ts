import { errorMiddleware } from '&/interfaces/middlewares/error.middleware';
import { Request } from '&/types/express';
import { AxiosError } from 'axios';
import { APIError } from '&/shared';

const req = {} as Request;
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

describe('Pruebas en el middleware de manejo general de errores', () => {
  it('Manejo del error de axios', () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 400,
        data: {
          errors: ['Verificando error de axios'],
        },
      },
    } as AxiosError;

    errorMiddleware(error, req, res as any, next);
    expect(res.json).toHaveBeenCalledWith({
      errors: ['Verificando error de axios'],
    });
    expect(res.status).toHaveBeenCalledWith(400);
  });
  it('Manejo del error JWT', () => {
    const error = {
      name: 'TokenExpiredError',
      message: 'Error de JWT.',
    } as APIError;
    errorMiddleware(error, req, res as any, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ errors: ['Error de JWT.'] });
  });
  it('Manejo error estandar', () => {
    const error = {
      code: 400,
      message: 'Error estadandar.',
    } as APIError;
    errorMiddleware(error, req, res as any, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: ['Error estadandar.'] });
  });
  it('Manejo error estandar sin valores', () => {
    const error = {} as APIError;
    errorMiddleware(error, req, res as any, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errors: ['Error interno de servidor.'] });
  });
});
