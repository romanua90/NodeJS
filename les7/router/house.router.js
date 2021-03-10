const router = require('express').Router();

const houseController = require('../controller/house.controller');
const houseMiddleware = require('../middleware/house.middleware');

router.get('/', houseMiddleware.isHouseSearchResultExist, houseController.getHouses);

router.post('/', houseMiddleware.isHouseValid, houseController.createHouse);

router.get('/:houseId', houseMiddleware.isIdValid, houseMiddleware.isHouseExist, houseController.getSingleHouse);

router.delete('/:houseId', houseMiddleware.isIdValid, houseController.deleteSingleHouse);

module.exports = router;
