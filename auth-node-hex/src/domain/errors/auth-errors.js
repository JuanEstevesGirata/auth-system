export const InvalidEmailError = (value) => ({
  type: 'InvalidEmailError',
  message: `Invalid email: ${value}`,
  value
});

export const InvalidPasswordError = (reason) => ({
  type: 'InvalidPasswordError',
  message: `Invalid password: ${reason}`
});

export const UserAlreadyInactiveError = (userId) => ({
  type: 'UserAlreadyInactiveError',
  message: `User with id ${userId} is already inactive`,
  userId
});

export const UserNotFoundError = (email) => ({
  type: 'UserNotFoundError',
  message: `No user found with email: ${email}`,
  email
});

export const IncorrectCredentialsError = () => ({
  type: 'IncorrectCredentialsError',
  message: `The email or password provided is incorrect`
});
