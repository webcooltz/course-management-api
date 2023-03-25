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
        .max(30),

    password: Joi.string()
        .alphanum()
        .required(),

    // access_token: [Joi.string(), Joi.number()],

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu'] } })
  }).with('email', 'password');

 module.exports = schema;