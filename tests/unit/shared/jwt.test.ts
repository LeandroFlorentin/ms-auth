import { generateToken, decodedToken } from '&/shared';

describe('Testing en JWT', () => {
  let token: string;
  const user = { username: 'Juan', password: 'asdf123$' };
  interface IUser {
    username: string;
    password: string;
  }
  it('Crear token', () => {
    const tokenCreated = generateToken(user);
    token = tokenCreated;
    expect(typeof token).toBe('string');
    expect(token).toBeDefined();
  });
  it('Decodificar token', () => {
    const tokenDecoded = decodedToken<IUser>(token);
    expect(tokenDecoded).toBeDefined();
    expect(typeof tokenDecoded).toBe('object');
    expect(tokenDecoded).toMatchObject(user);
  });
});
