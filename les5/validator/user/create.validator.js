const Joi = require('joi');

const { regexEnum } = require('../../constant');

module.exports = Joi.object({
    first_name: Joi.string()
        .alphanum()
        .min(2)
        .max(255)
        .required(),
    last_name: Joi.string()
        .alphanum()
        .min(2)
        .max(255)
        .required(),
    password: Joi.string().regex(regexEnum.PASSWORD_REGEX).required(),
    age: Joi.number()
        .integer()
        .min(1)
        .max(150)
        .required(),
    gender: Joi.string().alphanum().optional(),
    _houses: Joi.string()
        .alphanum()
        .min(30)
        .max(30)
        .optional()
});
