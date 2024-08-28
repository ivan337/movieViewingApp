import authMiddleware from '../middleware/auth-middleware';
import movieController from '../controller/movie-controller';
import Router from 'express';

const router = Router();

router.get('/loadList', authMiddleware, movieController.loadList);

export default router;