const router = require('express').Router();

const { HouseController } = require('../controller');
const { authMiddleware, houseMiddleware } = require('../middleware');

router.get('/', authMiddleware.checkAccessToken,
    houseMiddleware.isSearchQueryValid,
    HouseController.getHouses);

router.post('/', houseMiddleware.isHouseValid, HouseController.createHouse);

router.use('/:houseId',
    authMiddleware.checkAccessToken,
    houseMiddleware.isIdValid,
    houseMiddleware.isHouseExist);

router.get('/:houseId', HouseController.getSingleHouse);

router.delete('/:houseId', HouseController.deleteSingleHouse);

module.exports = router;
