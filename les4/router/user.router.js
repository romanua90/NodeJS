const router=require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getSingleUser);

router.delete('/:userId', userMiddleware.checkIsIdValid, userController.deleteUser);

router.post('/', userMiddleware.isUserValid, userController.createUser);

module.exports = router;
