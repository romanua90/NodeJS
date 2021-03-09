const router = require('express').Router();

const userRouter = require('./user.router');
const houseRouter = require('./house.router');
const addressRouter = require('./address.router');
const authRouter = require('./auth.router');

router.use('/users', userRouter);
router.use('/houses', houseRouter);
router.use('/address', addressRouter);
router.use('/auth', authRouter);

module.exports = router;
