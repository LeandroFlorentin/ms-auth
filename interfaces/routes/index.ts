import { Router } from 'express';
import userRoutes from './users.routes';
import loginRoutes from './auth.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', loginRoutes);

export default router;
