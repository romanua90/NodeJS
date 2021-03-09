const { userService, authService } = require('../service');
const errorCodes = require('../constant/errorCodes.enum.js');
const errorMessages = require('../messages/error.messages');
const { passwordHasher } = require('../helper');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const filter = req.query;

            delete filter.preferL;

            const users = await userService.findUsers(filter);
            res.status(errorCodes.OK).json(users);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await userService.findUserById(userId);

            res.status(errorCodes.OK).json(user);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },
    createUser: async (req, res) => {
        try {
            const { preferL = 'de' } = req.query;
            const { password } = res.body;

            const hashPassword = await passwordHasher.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            res.status(errorCodes.CREATED).json(errorMessages.USER_CREATED[preferL]);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { params: { userId }, query: { prefLang = 'de' } } = req;

            await authService.deleteAllUserTokens(req.user._id);
            await userService.deleteUser(userId);

            res.status(errorCodes.OK).json(errorMessages.USER_DELETED[prefLang]);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    },
};
