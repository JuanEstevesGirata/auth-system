import R from 'ramda';

// Either monad for error handling
export const Either = {
  Left: (value) => ({
    isLeft: true,
    isRight: false,
    value,
    map: () => Either.Left(value),
    flatMap: () => Either.Left(value),
    fold: (leftFn, rightFn) => leftFn(value),
    getOrElse: (defaultValue) => defaultValue
  }),
  
  Right: (value) => ({
    isLeft: false,
    isRight: true,
    value,
    map: (fn) => Either.Right(fn(value)),
    flatMap: (fn) => fn(value),
    fold: (leftFn, rightFn) => rightFn(value),
    getOrElse: (defaultValue) => value
  })
};

// Maybe monad for nullable values
export const Maybe = {
  Nothing: () => ({
    isNothing: true,
    isSomething: false,
    map: () => Maybe.Nothing(),
    flatMap: () => Maybe.Nothing(),
    fold: (nothingFn, somethingFn) => nothingFn(),
    getOrElse: (defaultValue) => defaultValue
  }),
  
  Something: (value) => ({
    isNothing: false,
    isSomething: true,
    value,
    map: (fn) => Maybe.Something(fn(value)),
    flatMap: (fn) => fn(value),
    fold: (nothingFn, somethingFn) => somethingFn(value),
    getOrElse: (defaultValue) => value
  }),
  
  fromNullable: (value) => 
    value == null ? Maybe.Nothing() : Maybe.Something(value)
};

// Task monad for async operations
export const Task = (computation) => ({
  fork: computation,
  map: (fn) => Task((reject, resolve) => 
    computation(reject, (value) => resolve(fn(value)))
  ),
  flatMap: (fn) => Task((reject, resolve) => 
    computation(reject, (value) => fn(value).fork(reject, resolve))
  ),
  fold: (leftFn, rightFn) => Task((reject, resolve) => 
    computation(
      (error) => resolve(leftFn(error)),
      (value) => resolve(rightFn(value))
    )
  )
});

// Utility functions
const safeAsync = (fn) => async (...args) => {
  try {
    const result = await fn(...args);
    return Either.Right(result);
  } catch (error) {
    return Either.Left(error);
  }
};

const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);

const curry = (fn) => (...args) => 
  args.length >= fn.length 
    ? fn(...args) 
    : (...nextArgs) => curry(fn)(...args, ...nextArgs);

const tryCatch = (fn) => (...args) => {
  try {
    return Either.Right(fn(...args));
  } catch (error) {
    return Either.Left(error);
  }
};

const asyncTryCatch = (fn) => async (...args) => {
  try {
    const result = await fn(...args);
    return Either.Right(result);
  } catch (error) {
    return Either.Left(error);
  }
};

const validate = (predicate, errorMessage) => (value) =>
  predicate(value) ? Either.Right(value) : Either.Left(new Error(errorMessage));

const chainValidations = (...validations) => (value) =>
  validations.reduce(
    (acc, validation) => acc.flatMap(validation),
    Either.Right(value)
  );

export default {
  safeAsync,
  pipe,
  compose,
  curry,
  tryCatch,
  asyncTryCatch,
  validate,
  chainValidations,
  ...R
};