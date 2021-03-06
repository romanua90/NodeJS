const router = require('express').Router();

const addressController = require('../controller/address.controller');
const addressMiddleware = require('../middleware/address.middleware');

router.get('/', addressMiddleware.isAddressSearchResultExist, addressController.getAddresses);

router.post('/', addressMiddleware.isAddressValid, addressController.createAddress);

router.get('/:addressId', addressMiddleware.isIdValid, addressMiddleware.isAddressExist, addressController.getSingleAddress);

router.delete('/:addressId', addressMiddleware.isIdValid, addressController.deleteSingleAddress);

module.exports = router;
