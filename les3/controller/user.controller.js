const userService = require('../service/user.service');
const errorCodes = require('../constant/errorCodes.enum.js');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const { body: { prefLang = 'de' } } = req;

            const users = await userService.findUsers(prefLang);

            res.json(users);
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
            const user = req.query;

            const { body: { prefLang = 'de' } } = req;

            await userService.createUser(user, prefLang);

            res.status(201).json('USER IS CREATED!');
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
