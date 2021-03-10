const Joi = require('joi');

const { regexEnum } = require('../../constant');

module.exports = Joi.object({
    email: Joi.string().regex(regexEnum.EMAIL_REGEX).required(),
    password: Joi.string().regex(regexEnum.PASSWORD_REGEX).required()
});
