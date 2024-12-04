import userController from '../controller/user-controller';
import Router from 'express';

const router = Router();

router.post('/login', userController.login);
router.post('/registartion', userController.registartion);

export default router;