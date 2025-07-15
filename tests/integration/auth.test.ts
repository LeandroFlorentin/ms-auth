import app from '&/main';
import { msUserRepository } from '&/infrastructure/ms-users';
import { cacheRepository } from '&/infrastructure/cache/repositories';
import { getInstance } from '&/infrastructure/test/helpers';

describe('Test de integración de los endpoints de autenticación.', () => {
  let token: string;
  it('Login exitoso.', async () => {
    try {
      const instance = getInstance('post', app, '/auth/login');
      const sendBody = { username: 'user_prueba', password: 'Prueba123$' };
      const { status, body } = await instance.send(sendBody);
      expect(status).toBe(200);
      expect(body).toMatchObject({
        token: expect.any(String),
      });
      token = body.token;
    } catch (error) {
      throw error;
    }
  });
  it('Password incorrecta.', async () => {
    try {
      const instance = getInstance('post', app, '/auth/login');
      const sendBody = { username: 'user_prueba', password: 'Prueba123' };
      const { status, body } = await instance.send(sendBody);
      expect(status).toBe(401);
      expect(body).toMatchObject({
        errors: ['Contraseña incorrecta.'],
      });
    } catch (error) {
      throw error;
    }
  });
  it('Usuario no encontrado.', async () => {
    const spyCache = jest.spyOn(cacheRepository, 'getValue').mockResolvedValue(null);
    const spyMsUser = jest.spyOn(msUserRepository, 'getUserByMsUsers').mockResolvedValue(null);
    try {
      const instance = getInstance('post', app, '/auth/login');
      const sendBody = { username: 'user_prueba123', password: 'Prueba123$' };
      const { status, body } = await instance.send(sendBody);
      expect(status).toBe(401);
      expect(body).toMatchObject({
        errors: ['Usuario incorrecto.'],
      });
    } catch (error) {
      throw error;
    }
    spyCache.mockRestore();
    spyMsUser.mockRestore();
  });
  it('Verificando endpoint Me', async () => {
    try {
      const headers = { Authorization: 'Bearer ' + token };
      const instance = getInstance('get', app, '/auth/me');
      const { status, body } = await instance.set(headers);
      expect(status).toBe(200);
      expect(body).toMatchObject({
        id: 1,
        username: 'user_prueba',
        email: 'prueba@gmail.com',
        role: ['ADMIN'],
        createdAt: expect.any(String),
        updatedAt: null,
        iat: expect.any(Number),
        exp: expect.any(Number),
      });
    } catch (error) {
      throw error;
    }
  });
});
