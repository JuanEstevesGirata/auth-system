import isEmail from 'validator/lib/isEmail.js';
import { Either } from '../shared/utils/functional-utils.js';
import { InvalidEmailError } from '../errors/auth-errors.js';

export function createEmail(value) {
  if (!isEmail(value)) {
    return Either.Left(InvalidEmailError(value));
  }

  return Either.Right(value);
}
