import { Router } from 'express';
import { createUserHandler } from '../controllers/users.controller';

const router = Router();
router.post('/create', createUserHandler);

export default router;
