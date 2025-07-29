import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerUser } from '../../../src/application/usecases/registerUser.js';

vi.mock('uuid', () => ({
  v4: () => 'mocked-uuid',
}));

describe('registerUser', () => {
  const mockUser = {
    id: 'mocked-uuid',
    email: 'test@example.com',
    password: 'hashed_password',
    active: true,
  };

  const userRepo = {
    save: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return Left with InvalidEmailError if email is invalid', async () => {
    const result = await registerUser(userRepo, {
      email: 'invalid-email',
      password: 'securePassword123',
    });

    expect(result.isLeft).toBe(true);
    expect(result.value.type).toBe('InvalidEmailError');
  });

  it('should return Left with InvalidUserError if createUser fails', async () => {
    const result = await registerUser(userRepo, {
      email: 'valid@gmail.com',
      password: '',
    });

    expect(result.isLeft).toBe(true);
    expect(result.value.type).toBe('InvalidPasswordError');
  });

  it('should return Right with user if everything is valid', async () => {
    userRepo.save.mockResolvedValueOnce(mockUser);

    const result = await registerUser(userRepo, {
      email: 'test@example.com',
      password: 'securePassword@123',
    });

    expect(userRepo.save).toHaveBeenCalledTimes(1);
    expect(userRepo.save).toHaveBeenCalledWith(expect.objectContaining({
      id: 'mocked-uuid',
      email: 'test@example.com',
    }));

    expect(result.isRight).toBe(true);
    expect(result.value).toEqual(mockUser);
  });
});
