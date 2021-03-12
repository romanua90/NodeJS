const Joi = require('joi');

module.exports = {
    land: Joi.string()
        .alphanum()
        .min(2)
        .max(255)
        .optional(),
    region: Joi.string()
        .alphanum()
        .min(2)
        .max(255)
        .optional(),
    city: Joi.string()
        .alphanum()
        .min(2)
        .max(255)
        .optional(),
    street: Joi.string()
        .alphanum()
        .min(2)
        .max(255)
        .optional(),
    number: Joi.number().integer().min(0).optional()
};
