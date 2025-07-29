import { describe, it, expect } from 'vitest';
import { createPassword } from '../../../src/domain/value-objects/password.js';

describe('createPassword', () => {
  it('should return the password if valid', () => {
    const pwd = 'Secret123@5678';
    const result = createPassword(pwd);

    expect(result.isRight).toBe(true);
    expect(result.value).toBe(pwd);
  });

  it('should throw InvalidPasswordError if password too short', () => {
    const pwd = '123';
    const result = createPassword(pwd);
    
    expect(result.isLeft).toBe(true);
    expect(result.value.type).toBe('InvalidPasswordError');
  });
});
