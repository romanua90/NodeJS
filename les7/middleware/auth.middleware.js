const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_REFRESH } = require('../config/config');
const { errorCodesEnum: statusCode, constant } = require('../constant');
const { ErrorHandler } = require('../helper');
const { errorMessages } = require('../messages');
const { Token } = require('../model');
const { userService } = require('../service');
const { authValidators } = require('../validator');

module.exports = {
    isAuthDataValid: async (req, res, next) => {
        try {
            const { preferL = 'de' } = req.query;
            const { error } = await authValidators.authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCode.BAD_REQUEST,
                    errorMessages.JOI_VALIDATION_ERROR.customCode,
                    errorMessages.JOI_VALIDATION_ERROR[preferL]);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isAuthUserExist: async (req, res, next) => {
        try {
            const { email } = req.body;
            const { preferL = 'de' } = req.query;

            const user = await userService.findOneUser({ email });

            if (!user) {
                throw new ErrorHandler(statusCode.NOT_FOUND,
                    errorMessages.NO_RESULT_FOUND.customCode,
                    errorMessages.NO_RESULT_FOUND[preferL]);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const { preferL = 'de' } = req.query;
            const access_token = req.get(constant.AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(statusCode.BAD_REQUEST,
                    errorMessages.ABSENT_ACCESS_TOKEN.customCode,
                    errorMessages.ABSENT_ACCESS_TOKEN[preferL]);
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(statusCode.UNAUTHORIZED,
                        errorMessages.ACCESS_TOKEN_NOT_VALID.customCode,
                        errorMessages.ACCESS_TOKEN_NOT_VALID[preferL]);
                }
            });

            const tokens = await Token.findOne({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new ErrorHandler(statusCode.FORBIDDEN,
                    errorMessages.SUSPICIOUS_TOKEN.customCode,
                    errorMessages.SUSPICIOUS_TOKEN[preferL]);
            }

            req.user = tokens._user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const { preferL = 'de' } = req.query;
            const refresh_token = req.get(constant.AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(statusCode.BAD_REQUEST,
                    errorMessages.ABSENT_REFRESH_TOKEN.customCode,
                    errorMessages.ABSENT_REFRESH_TOKEN[preferL]);
            }

            jwt.verify(refresh_token, JWT_REFRESH, (err) => {
                if (err) {
                    throw new ErrorHandler(statusCode.UNAUTHORIZED,
                        errorMessages.REFRESH_TOKEN_NOT_VALID.customCode,
                        errorMessages.REFRESH_TOKEN_NOT_VALID[preferL]);
                }
            });

            const tokens = await Token.findOne({ refresh_token });

            if (!tokens) {
                throw new ErrorHandler(statusCode.FORBIDDEN,
                    errorMessages.SUSPICIOUS_TOKEN.customCode,
                    errorMessages.SUSPICIOUS_TOKEN[preferL]);
            }

            req.oldTokens = tokens;

            next();
        } catch (e) {
            next(e);
        }
    },
};
