import { describe, it, expect } from 'vitest';
import { createUserId } from '../../../src/domain/value-objects/userId.js';

describe('createUserId', () => {
  it('should return user id if valid', () => {
    const result = createUserId('user-123')

    expect(result.isRight).toBe(true);
    expect(result.value).toBe('user-123');
  });

  it('should throw error if id is missing', () => {
    const result = createUserId(null)

    expect(result.isLeft).toBe(true);
    expect(result.value.type).toBe('InvalidUserIdError');
  });
});
