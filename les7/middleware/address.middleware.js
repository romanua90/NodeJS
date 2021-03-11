const { errorCodesEnum: statusCode } = require('../constant');
const { ErrorHandler } = require('../helper');
const { errorMessages } = require('../messages');
const { addressService } = require('../service');
const { utilValidators, addressValidators } = require('../validator');

module.exports = {
    isIdValid: async (req, res, next) => {
        try {
            const { addressId } = req.params;

            const { error } = await utilValidators.idMongooseValidator.validate(addressId);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST,
                    errorMessages.JOI_VALIDATION_ERROR.customCode,
                    error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isAddressValid: async (req, res, next) => {
        try {
            const { error } = await addressValidators.createValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST,
                    errorMessages.JOI_VALIDATION_ERROR.customCode,
                    error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isSearchQueryValid: async (req, res, next) => {
        try {
            const filter = req.query;

            delete filter.preferL;

            if (!filter) {
                next();
            }

            const { error } = await addressValidators.findValidator.validate(filter);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST,
                    errorMessages.JOI_VALIDATION_ERROR.customCode,
                    error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isAddressExist: async (req, res, next) => {
        try {
            const { addressId } = req.params;
            const { preferL = 'de' } = req.query;

            const address = await addressService.findAddressById(addressId);

            if (!address) {
                throw new ErrorHandler(statusCode.NOT_FOUND,
                    errorMessages.NO_RESULT_FOUND.customCode,
                    errorMessages.NO_RESULT_FOUND[preferL]);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
