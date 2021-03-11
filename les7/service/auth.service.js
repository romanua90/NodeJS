const { tokenizer } = require('../helper');
const { Token } = require('../model');

module.exports = {
    generateTokens: async (user) => {
        const tokens = tokenizer();

        await Token.create({ ...tokens, _user_id: user._id });

        return tokens;
    },

    refreshTokens: async (oldTokens) => {
        await Token.findByIdAndRemove(oldTokens._id);

        const tokens = tokenizer();

        await Token.create({ ...tokens, _user_id: oldTokens._user_id });

        return tokens;
    },

    deleteAllUserTokens: async (userId) => {
        await Token.remove({ _user_id: userId });
    }
};
