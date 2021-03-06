const addressService = require('../service/address.service');
const statusCode = require('../constant/errorCodes.enum');
const errorMessage = require('../messages/error.messages');

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const { addressId } = req.params;
            const { preferL = 'en' } = req.query;

            if (addressId.length !== 24) {
                throw new Error(errorMessage.ID_IS_INVALID[preferL]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    isAddressValid: (req, res, next) => {
        try {
            const {
                country, region, town, street, number
            } = req.body;
            const { preferL = 'en' } = req.query;

            if (!country || !region || !town || !street || !number) {
                throw new Error(errorMessage.ABSENT_FIELDS[preferL]);
            }

            if (number < 0 || !Number.isInteger(number) || Number.isNaN(number)) {
                throw new Error(errorMessage.HOUSE_NUMBER_IS_INVALID[preferL]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    isAddressSearchResultExist: async (req, res, next) => {
        try {
            const { preferL = 'en' } = req.query;
            const filter = req.query;

            delete filter.preferL;

            const addresses = await addressService.findAddresses(filter);

            if (filter && !addresses.length) {
                throw new Error(errorMessage.NO_RESULT_FOUND[preferL]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    isAddressExist: async (req, res, next) => {
        try {
            const { addressId } = req.params;
            const { preferL = 'en' } = req.query;

            const address = await addressService.findAddressById(addressId);

            if (!address) {
                throw new Error(errorMessage.NO_RESULT_FOUND[preferL]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
};
