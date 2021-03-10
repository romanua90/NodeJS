const { userService } = require('../service');
const { errorCodesEnum: statusCode } = require('../constant');
const { errorMessages: errorMessage } = require('../messages');
const { userValidators } = require('../validator');
const { User } = require('../model');

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

    isSearchQueryValid: async (req, res, next) => {
        try {
            const filter = req.query;

            delete filter.preferL;

            if (!filter) {
                next();
            }

            const { error } = await userValidators.findUserValidator.validate(filter);

            if (error) {
                throw new Error(error.details[0].message);
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
    },
    isUserAlreadyExist: async (req, res, next) => {
        try {
            const { email } = req.body;
            const { preferL = 'de' } = req.query;

            const user = await User.findOne({ email });

            if (user) {
                throw new Error(errorMessage.USER_ALREADY_EXIST[preferL]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    accessRightsCheck: (req, res, next) => {
        try {
            const { userId } = req.params;
            const { preferL = 'en' } = req.query;
            const { user } = req;

            if (userId !== user.id) {
                throw new Error(errorMessage.UNAUTHORISED_ACCESS[preferL]);
            }

            next();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
};
