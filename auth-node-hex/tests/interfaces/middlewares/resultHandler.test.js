import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resultHandler } from '../../../src/interfaces/middlewares/resultHandler.js';

describe('resultHandler middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      locals: {},
    };
    next = vi.fn();
  });

  it('should return 200 and data when result is Right', () => {
    res.locals.result = {
      isRight: true,
      isLeft: false,
      value: { id: '123', email: 'test@example.com' },
    };

    resultHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: '123', email: 'test@example.com' });
  });

  it('should return 400 when result is Left with BadRequest type', () => {
    res.locals.result = {
      isRight: false,
      isLeft: true,
      value: { type: 'BadRequest', message: 'Invalid input' },
    };

    resultHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input' });
  });

  it('should return 500 when result is Left with unknown type', () => {
    res.locals.result = {
      isRight: false,
      isLeft: true,
      value: { type: 'UnknownError', message: 'Internal error' },
    };

    resultHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal error' });
  });

  it('should return 500 when no result is present', () => {
    resultHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'No result returned from controller' });
  });
});