import Router from 'express';

import userController from '../controller/user-controller';
import authMiddleware from '../middleware/auth-middleware';

const router = Router();

router.post('/login', userController.login);
router.post('/registration', userController.registration);
router.get('/refresh', userController.refresh);
router.get('/loadProfile', authMiddleware, userController.loadProfile);

export default router;
