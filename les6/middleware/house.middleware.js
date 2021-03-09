const houseService = require('../service/house.service');
const statusCode = require('../constant/errorCodes.enum');
const errorMessage = require('../messages/error.messages');

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const { houseId } = req.params;
            const { preferL = 'en' } = req.query;

            if (houseId.length !== 24) {
                throw new Error(errorMessage.ID_IS_INVALID[preferL]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    isHouseValid: (req, res, next) => {
        try {
            const {
                area, price, year_builded, year_selled
            } = req.body;
            const { preferL = 'en' } = req.query;

            if (!area || !price || !year_builded || !year_selled) {
                throw new Error(errorMessage.ABSENT_FIELDS[preferL]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    isHouseSearchResultExist: async (req, res, next) => {
        try {
            const { preferL = 'en' } = req.query;
            const filter = req.query;

            delete filter.preferL;

            const houses = await houseService.findHouses(filter, preferL);

            if (filter && !houses.length) {
                throw new Error(errorMessage.NO_RESULT_FOUND[preferL]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    isHouseExist: async (req, res, next) => {
        try {
            const { houseId } = req.params;
            const { preferL = 'en' } = req.query;

            const house = await houseService.findHouseById(houseId);

            if (!house) {
                throw new Error(errorMessage.NO_RESULT_FOUND[preferL]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
};
