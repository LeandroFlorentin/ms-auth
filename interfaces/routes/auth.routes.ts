import { Router } from 'express';
import { loginUserHandler, meUserHandler } from '../controllers/auth.controller';
import tokenMiddleware from '../middlewares/token.middleware';

const router = Router();
router.post('/login', loginUserHandler);
router.get('/me', tokenMiddleware, meUserHandler);

export default router;
