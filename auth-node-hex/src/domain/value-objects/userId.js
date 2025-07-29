import { Either } from '../shared/utils/functional-utils.js';

export function InvalidUserIdError(value) {
  return { type: 'InvalidUserIdError', message: `Invalid user id: ${value}` };
}

export function createUserId(value) {
  if (!value || typeof value !== 'string') {
    return Either.Left(InvalidUserIdError(value));
  }

  return Either.Right(value);
}
