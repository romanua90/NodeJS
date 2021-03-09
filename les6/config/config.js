module.exports = {
    MONGO_URL: 'mongodb://localhost:27017/les6',
    JWT_SECRET: process.env.JWT_SECRET || 'isNotSoEasyBroSorry',
    JWT_REFRESH: process.env.JWT_REFRESH || 'pleaseTryAgainLater',
    PORT: 5000
};
