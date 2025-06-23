import { Router } from 'express';
import { loginUserHandler, meUserHandler } from '../controllers/auth.controller';

const router = Router();
router.post('/login', loginUserHandler);
router.get('/me', meUserHandler);

export default router;
