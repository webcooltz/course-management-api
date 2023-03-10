const Joi = require('joi');

const schema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    bio: Joi.string()
        .alphanum()
        .min(3)
        .max(150),

    email: Joi.string()
        .email()
        .required()
  });

 module.exports = schema;
