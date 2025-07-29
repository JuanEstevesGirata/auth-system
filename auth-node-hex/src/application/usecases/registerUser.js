import { createUser } from '../../domain/factories/user.factory.js';
import { createEmail } from '../../domain/value-objects/email.js';
import { createPassword } from '../../domain/value-objects/password.js';
import { Either } from '../../domain/shared/utils/functional-utils.js';
import { v4 as uuidv4 } from 'uuid';

export async function registerUser(userRepo, { email, password }) {
  const emailResult = createEmail(email);    
  if (emailResult.isLeft) return Either.Left(emailResult.value);

  const passwordResult = createPassword(password);
  if (passwordResult.isLeft) return Either.Left(passwordResult.value);

  const id = uuidv4();

  const userResult = createUser({
    id,
    email: emailResult.value,
    password
    });

  if (userResult.isLeft) {
    return Either.Left(userResult.value);
  }

  const user = userResult.value;
  const savedUser = await userRepo.save(user);

  return Either.Right(savedUser);
}
