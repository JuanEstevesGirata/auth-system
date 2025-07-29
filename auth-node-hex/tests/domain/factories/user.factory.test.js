import { describe, it, expect } from 'vitest';
import { createUser, deactivateUser } from '../../../src/domain/factories/user.factory.js';

describe('createUser', () => {
  it('should return Right with a valid user', () => {
    const result = createUser({
      id: 'user-1',
      email: 'user@test.com',
      password: 'Secret123@5678'
    });

    expect(result.isRight).toBe(true);
    expect(result.value.email).toBe('user@test.com');
  });

  it('should return Left if email is invalid', () => {
    const result = createUser({
      id: 'user-1',
      email: 'invalid',
      password: '123456'
    });

    expect(result.isLeft).toBe(true);
    expect(result.value.message).toMatch(/Invalid email/);
  });

  it('should return Left if password is invalid', () => {
    const result = createUser({
      id: 'user-1',
      email: 'user@test.com',
      password: '123'
    });
   
    expect(result.isLeft).toBe(true);
    expect(result.value.message).toMatch(/Invalid password/);
  });
});

describe('deactivateUser', () => {
  it('should deactivate an active user', () => {
    const activeUser = {
      id: 'user-1',
      email: 'a@b.com',
      password: '123456',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = deactivateUser(activeUser);

    expect(result.value.isActive).toBe(false);
    expect(result.value.updatedAt).toBeInstanceOf(Date);
  });

  it('should return Left if user is already inactive', () => {
    const inactiveUser = {
      id: 'user-2',
      email: 'a@b.com',
      password: '123456',
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = deactivateUser(inactiveUser);
    expect(result.value.message).toMatch(/already inactive/);
  });
});
