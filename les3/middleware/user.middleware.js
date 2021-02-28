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
            const { name, email, preferL = 'de' } = req.query;

            if (!name || !email) {
                throw new Error('Some field is empty');
            }

            if (!email.includes('@')) {
                throw new Error(errorMessages.WRONG_EMAIL[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
