const { errorCodesEnum: statusCode } = require('../constant');
const { authService } = require('../service');

module.exports = {
    authUser: async (req, res) => {
        try {
            const { password } = req.body;
            const { user } = req;

            const tokens = await authService.generateTokens(user, password);

            res.status(statusCode.OK).json(tokens);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    generateNewTokenPair: async (req, res) => {
        try {
            const { oldTokens } = req;

            const tokens = await authService.refreshTokens(oldTokens);

            res.status(statusCode.OK).json(tokens);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
};
