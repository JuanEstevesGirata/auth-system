import { describe, it, expect } from 'vitest';
import { isActiveUser } from '../../../src/domain/specs/isActive.js';

describe('isActiveUser', () => {
  it('should return true if user is active', () => {
    expect(isActiveUser({ isActive: true })).toBe(true);
  });

  it('should return false if user is inactive', () => {
    expect(isActiveUser({ isActive: false })).toBe(false);
  });
});
