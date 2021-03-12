const router = require('express').Router();

const { UserController } = require('../controller');
const { userMiddleware, authMiddleware } = require('../middleware');

router.get('/', authMiddleware.checkAccessToken,
    userMiddleware.isSearchQueryValid,
    UserController.getUsers);

router.post('/', userMiddleware.isUserValid,
    userMiddleware.isUserAlreadyExist,
    UserController.createUser);

router.get('/:userId', UserController.getSingleUser);

router.delete('/:userId',
    userMiddleware.isIdValid,
    UserController.deleteSingleUser);

module.exports = router;
