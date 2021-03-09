const houseService = require('../service/house.service');
const statusCode = require('../constant/errorCodes.enum');
const successMessage = require('../messages/error.messages');

module.exports = {
    getHouses: async (req, res) => {
        try {
            const filter = req.query;

            delete filter.preferL;

            const houses = await houseService.findHouses(filter);

            res.status(statusCode.OK).json(houses);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    createHouse: async (req, res) => {
        try {
            const { preferL = 'en' } = req.query;

            await houseService.createHouse(req.body);

            res.status(statusCode.CREATED).json(successMessage.HOUSE_CREATED[preferL]);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    getSingleHouse: async (req, res) => {
        try {
            const { houseId } = req.params;

            const house = await houseService.findHouseById(houseId);

            res.status(statusCode.OK).json(house);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    deleteSingleHouse: async (req, res) => {
        try {
            const { preferL = 'en' } = req.query;
            const { houseId } = req.params;

            await houseService.deleteHouse(houseId);

            res.status(statusCode.OK).json(successMessage.HOUSE_DELETED[preferL]);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },
};
