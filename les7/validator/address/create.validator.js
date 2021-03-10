const Joi = require('joi');

module.exports = Joi.object({
    land: Joi.string()
        .alphanum()
        .min(2)
        .max(255)
        .required(),
    region: Joi.string()
        .alphanum()
        .min(2)
        .max(255)
        .required(),
    city: Joi.string()
        .alphanum()
        .min(2)
        .max(255)
        .required(),
    street: Joi.string()
        .alphanum()
        .min(2)
        .max(255)
        .required(),
    number: Joi.number().integer().min(0).required()
});
