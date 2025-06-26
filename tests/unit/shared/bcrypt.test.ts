import { hashPassword, comparePassword } from '&/shared';

describe('Bcrypt testing', () => {
  let password = 'asdf1!';
  it('Testing función hashPassword', async () => {
    const hash = await hashPassword(password);
    expect(typeof hash).toBe('string');
    expect(hash).not.toBe(password);
  });
  it('Testing función comparePassword True', async () => {
    const hash = await hashPassword(password);
    const compare = await comparePassword(password, hash);
    expect(typeof compare).toBe('boolean');
    expect(compare).toBeTruthy();
  });
  it('Testing función comparePassword False', async () => {
    const hash = await hashPassword(password);
    const compare = await comparePassword('contraseña123$', hash);
    expect(typeof compare).toBe('boolean');
    expect(compare).toBeFalsy();
  });
});
