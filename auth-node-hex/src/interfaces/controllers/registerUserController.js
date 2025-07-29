import { registerUser } from '../../application/usecases/registerUser';

export function makeRegisterUserController({ userRepo, generateId, hashPassword }) {
  return async function registerUserController(req, res, next) {
    const { email, password } = req.body;

    const result = await registerUser(userRepo, { email, password }, { generateId, hashPassword });

    res.locals.result = result;
    return next();
  };
}
