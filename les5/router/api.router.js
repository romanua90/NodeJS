const router = require('express').Router();

const userRouter = require('./user.router');
const houseRouter = require('./house.router');
const addressRouter = require('./address.router');

router.use('/users', userRouter);
router.use('/houses', houseRouter);
router.use('/address', addressRouter);

module.exports = router;
