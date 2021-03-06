const userService = require('../service/user.service');
const statusCode = require('../constant/errorCodes.enum');
const errorMessage = require('../messages/error.messages');

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;
            const { preferL = 'de' } = req.query;

            if (userId.length !== 24) {
                throw new Error(errorMessage.ID_IS_INVALID[preferL]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const { first_name, last_name, age } = req.body;
            const { preferL = 'de' } = req.query;

            if (!first_name || !last_name || !age) {
                throw new Error(errorMessage.ABSENT_FIELDS[preferL]);
            }

            if (first_name.length < 2) {
                throw new Error(errorMessage.TOO_SHORT_FIRST_NAME[preferL]);
            }

            if (last_name.length < 2) {
                throw new Error(errorMessage.TOO_SHORT_LAST_NAME[preferL]);
            }

            if (age.length > 3) {
                throw new Error(errorMessage.TOO_OLD[preferL]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    isUserSearchResultExist: async (req, res, next) => {
        try {
            const { preferL = 'de' } = req.query;
            const filter = req.query;

            delete filter.preferL;

            const users = await userService.findUsers(filter, preferL);

            if (filter && !users.length) {
                throw new Error(errorMessage.NO_RESULT_FOUND[preferL]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    isUserExist: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { preferL = 'de' } = req.query;

            const user = await userService.findUserById(userId);

            if (!user) {
                throw new Error(errorMessage.NO_RESULT_FOUND[preferL]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
};
