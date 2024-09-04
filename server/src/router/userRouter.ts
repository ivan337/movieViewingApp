import userController from '../controller/user-controller';
import Router from 'express';
import authMiddleware from "../middleware/auth-middleware";

const router = Router();

router.post('/login', userController.login);
router.post('/registartion', userController.registartion);
router.get('/refresh', userController.refresh);
router.get('/loadProfile', authMiddleware, userController.loadProfile);

export default router;