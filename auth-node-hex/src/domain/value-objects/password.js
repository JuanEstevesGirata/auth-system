import isStrongPassword from 'validator/lib/isStrongPassword.js';
import { InvalidPasswordError } from '../errors/auth-errors.js';
import { Either } from '../shared/utils/functional-utils.js';

export function createPassword(value) {
  const isValid =
    typeof value === 'string' &&
    isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    });

  if (!isValid) {
    return Either.Left(InvalidPasswordError(value));
  }

  return Either.Right(value);
}
