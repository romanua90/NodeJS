const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userMiddleware.isUserSearchResultExist, userController.getAllUsers);

router.get('/:userId', userMiddleware.isUserExist, userMiddleware.isIdValid, userController.getSingleUser);

router.delete('/:userId', userMiddleware.isIdValid, userController.deleteUser);

router.post('/', userMiddleware.isUserValid, userController.createUser);

module.exports = router;
