const errorCodes = require('../constant/errorCodes.enum');
const errorMessages = require('../messages/error.messages');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;

            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error('Not Valid ID');
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const { first_name, last_name, age } = req.body;
            const { preferL = 'de' } = req.query;

            if (!first_name || !last_name || !age) {
                throw new Error(errorMessages.ABSENT_FIELDS[preferL]);
            }

            if (first_name.length < 2) {
                throw new Error(errorMessages.TOO_SHORT_FIRST_NAME[preferL]);
            }

            if (last_name.length < 2) {
                throw new Error(errorMessages.TOO_SHORT_LAST_NAME[preferL]);
            }

            if (age < 0 || !Number.isInteger(age) || Number.isNaN(age)) {
                throw new Error(errorMessages.AGE_IS_INVALID[preferL]);
            }

            if (age.length > 3) {
                throw new Error(errorMessages.TOO_BIG_AGE[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
