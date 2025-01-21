import Router from 'express';

import movieRouter from './movieRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/movie', movieRouter);

export default router;
