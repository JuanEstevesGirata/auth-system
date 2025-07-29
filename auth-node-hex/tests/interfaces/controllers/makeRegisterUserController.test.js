import { describe, it, expect, vi } from 'vitest';
import { makeRegisterUserController } from '../../../src/interfaces/controllers/registerUserController.js';

describe('registerUserController', () => {
  const mockUserRepo = {
    save: vi.fn(() => Promise.resolve(fakeUser))
  };
  const generateId = vi.fn(() => 'generated-id');
  const hashPassword = vi.fn(() => Promise.resolve('hashed-password'));

  const fakeUser = { id: 'generated-id', email: 'test@example.com', password: 'hashed-password' };

  it('sets Right result when registration succeeds', async () => {
    const registerUser = vi.fn(() =>
      Promise.resolve({
        isRight: true,
        isLeft: false,
        value: fakeUser,
      })
    );

    const controller = makeRegisterUserController({
      userRepo: mockUserRepo,
      generateId,
      hashPassword,
      registerUser,
    });

    const req = { body: { email: 'test@example.com', password: '123456Test@' } };
    const res = { locals: {} };
    const next = vi.fn();

    await controller(req, res, next);

    expect(res.locals.result.isRight).toBe(true);
    expect(res.locals.result.value).toEqual(fakeUser);
    expect(next).toHaveBeenCalled();
  });

  it('sets Left result when registration fails', async () => {
    const registerUser = vi.fn(() =>
      Promise.resolve({
        isRight: false,
        isLeft: true,
        value: { type: 'BadRequest', message: 'Email already exists' },
      })
    );

    const controller = makeRegisterUserController({
      userRepo: mockUserRepo,
      generateId,
      hashPassword,
      registerUser,
    });

    const req = { body: { email: 'test@example.com', password: '123456' } };
    const res = { locals: {} };
    const next = vi.fn();

    await controller(req, res, next);

    expect(res.locals.result.isLeft).toBe(true);   
    expect(next).toHaveBeenCalled();
  });
});
