import express from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { resultHandler } from '../middlewares/resultHandler.js';
import { makeRegisterUserController } from '../controllers/registerUserController.js';

const router = express.Router();

const controller = makeRegisterUserController({ userRepo, generateId, hashPassword });

router.post('/register', asyncHandler(controller), resultHandler);

export default router;
