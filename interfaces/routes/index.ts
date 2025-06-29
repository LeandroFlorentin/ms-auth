import { Router } from 'express';
import loginRoutes from './auth.routes';

const router = Router();

router.use('/auth', loginRoutes);

export default router;
