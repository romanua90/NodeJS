const router = require('express').Router();

const { AuthController } = require('../controller');
const { authMiddleware } = require('../middleware');

router.post('/', authMiddleware.isAuthDataValid, authMiddleware.isAuthUserExist, AuthController.authUser);

router.post('/refresh', authMiddleware.checkRefreshToken, AuthController.generateNewTokenPair);

module.exports = router;
