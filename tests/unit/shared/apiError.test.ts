import { APIError } from '&/shared';

describe('Testing APIError', () => {
  it('Devuelve el error correctamente', () => {
    const code = 400;
    const message = 'Error de prueba';
    const error = new APIError(code, message);
    expect(error).toBeInstanceOf(APIError);
    expect(error.code).toBe(code);
    expect(error.message).toEqual(message);
  });
  it('Error con valores default', () => {
    const error = new APIError();
    expect(error).toBeInstanceOf(APIError);
    expect(error.code).toBe(500);
    expect(error.message).toEqual('Error interno de servidor.');
  });
});
