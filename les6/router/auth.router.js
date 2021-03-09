const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');

router.post('/', authMiddleware.isAuthDataValid, authMiddleware.isAuthUserExist, authController.authUser);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.generateNewTokenPair);

module.exports = router;
