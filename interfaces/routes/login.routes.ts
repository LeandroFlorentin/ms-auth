import { Router } from 'express';
import { loginUserHandler } from '../controllers/auth.controller';

const router = Router();
router.post('/login', loginUserHandler);

export default router;
