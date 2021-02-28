const userService = require('../service/user.service');
const errorCodes = require('../constant/errorCodes.enum.js');
const errorMessages = require('../messages/error.messages');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const { preferL = 'en' } = req.query;
            const filter = req.query;

            delete filter.preferL;

            const users = await userService.findUsers(filter, preferL);
            res.status(errorCodes.OK).json(users);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const { params: { userId }, body: { prefLang = 'de' } } = req;

            const user = await userService.findUserById(userId, prefLang);

            res.json(user);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },
    createUser: async (req, res) => {
        try {
            const { preferL = 'en' } = req.query;

            await userService.createUser(req.body);

            res.status(errorCodes.CREATED).json(errorMessages.USER_CREATED[preferL]);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { params: { userId }, body: { prefLang = 'de' } } = req;

            const user = await userService.deleteUser(userId, prefLang);
            console.log(user);

            res.status(201).json('USER WAS DELETED!');
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    }
};
