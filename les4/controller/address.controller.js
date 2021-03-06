const addressService = require('../service/address.service');
const statusCode = require('../constant/errorCodes.enum');
const successMessage = require('../messages/error.messages');

module.exports = {
    getAddresses: async (req, res) => {
        try {
            const filter = req.query;

            delete filter.preferL;

            const addresses = await addressService.findAddresses(filter);

            res.status(statusCode.OK).json(addresses);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    createAddress: async (req, res) => {
        try {
            const { preferL = 'en' } = req.query;

            await addressService.createAddress(req.body);

            res.status(statusCode.CREATED).json(successMessage.ADDRESS_CREATED[preferL]);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    getSingleAddress: async (req, res) => {
        try {
            const { addressId } = req.params;

            const address = await addressService.findAddressById(addressId);

            res.status(statusCode.OK).json(address);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    deleteSingleAddress: async (req, res) => {
        try {
            const { preferL = 'en' } = req.query;
            const { addressId } = req.params;

            await addressService.deleteAddress(addressId);

            res.status(statusCode.OK).json(successMessage.ADDRESS_DELETED[preferL]);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
};
