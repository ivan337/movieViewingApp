const Router = require('express').Router;
const userController = require('../controller/user-controller');

const router = new Router();

router.post('/login', userController.login);

module.exports = router;