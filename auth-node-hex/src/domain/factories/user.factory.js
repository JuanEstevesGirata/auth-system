import { createEmail } from '../value-objects/email.js';
import { createPassword } from '../value-objects/password.js';
import { createUserId } from '../value-objects/userId.js';
import { Either } from '../shared/utils/functional-utils.js';
import { UserAlreadyInactiveError } from '../errors/auth-errors.js'

export function createUser({ id, email, password }) {
const userIdResult = createUserId(id);
  if (userIdResult.isLeft) return Either.Left(userIdResult.value);

  const emailResult = createEmail(email);
  if (emailResult.isLeft) return Either.Left(emailResult.value);

  const passwordResult = createPassword(password);
  if (passwordResult.isLeft) return Either.Left(passwordResult.value);

  const now = new Date();

  return Either.Right({
    id: userIdResult.value,
    email: emailResult.value,
    password: null,
    hashedPassword: passwordResult.value,
    isActive: true,
    createdAt: now,
    updatedAt: now
  });
}

/**
 * Deactivates a user if active, otherwise returns an error.
 * @param {User} user
 * @returns {Either<Error, User>}
 */
export function deactivateUser(user) {
  if (!user.isActive) {
    return Either.Left(UserAlreadyInactiveError(user.id));
  }

  const updatedAt = new Date();

  return Either.Right({
    ...user,
    isActive: false,
    updatedAt
  });
}

