import { describe, it, expect } from 'vitest';
import { createEmail } from '../../../src/domain/value-objects/email.js';

describe('createEmail', () => {
  it('should return the email if valid', () => {
    const email = 'test@example.com';
    const result = createEmail(email);

    expect(result.isRight).toBe(true);
    expect(result.value).toBe(email);
  });

  it('should return Left with InvalidEmailError if email is invalid', () => {
    const email = 'invalid';
    const result = createEmail(email);

    expect(result.isLeft).toBe(true);
    expect(result.value.type).toBe('InvalidEmailError');
    expect(result.value.value).toBe('invalid');
  });
});
