const router = require('express').Router();

const { AddressController } = require('../controller');
const { addressMiddleware } = require('../middleware');

router.get('/', addressMiddleware.isAddressExist, AddressController.getAddresses);

router.post('/', addressMiddleware.isAddressValid, AddressController.createAddress);

router.get('/:addressId', addressMiddleware.isIdValid, addressMiddleware.isAddressExist, AddressController.getSingleAddress);

router.delete('/:addressId', addressMiddleware.isIdValid, AddressController.deleteSingleAddress);

module.exports = router;
