const { userService } = require('../service');
const { errorCodesEnum: statusCode } = require('../constant');
const { errorMessages: errorMessage } = require('../messages');
const { userValidators } = require('../validator');

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

    isUserValid: async (req, res, next) => {
        try {
            const { error } = await userValidators.createValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
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
