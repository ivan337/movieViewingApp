import authMiddleware from "../middleware/auth-middleware";

import userController from "../controller/user-controller";

const Router = require('express').Router;
const router = new Router();

router.post('/login', authMiddleware, userController.login);
router.post('/registartion', userController.registartion);

export default router;