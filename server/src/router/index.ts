import Router from 'express';
import userRouter from './userRouter';
import movieRouter from './movieRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/movie', movieRouter);

export default router;