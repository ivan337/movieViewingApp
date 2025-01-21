import Router from 'express';

import movieController from '../controller/movie-controller';
import authMiddleware from '../middleware/auth-middleware';

const router = Router();

router.get('/loadList', authMiddleware, movieController.loadList);

export default router;
