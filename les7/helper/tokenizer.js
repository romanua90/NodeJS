const jwt = require('jsonwebtoken');

const { JWT_REFRESH, JWT_SECRET } = require('../config/config');

module.exports = () => {
    const access_token = jwt.sign({},
        JWT_SECRET, { expiresIn: '20m' });
    const refresh_token = jwt.sign({},
        JWT_REFRESH, { expiresIn: '31d' });

    return {
        access_token,
        refresh_token
    };
};
