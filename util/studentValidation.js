// needs editing
const Joi = require('joi');

const schema = Joi.object({
    charName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    
    level: Joi.number()
        .min(1)
        .max(70),

    money: Joi.number()
        .min(0)
        .max(9999),

    createdAt: Joi.string()
        .alphanum(),

    lastPlayed: Joi.string()
        .alphanum(),

    owner: Joi.string()
        .alphanum()
        .min(1)
        .max(20)
        .required(),

    location: Joi.string()
        .alphanum()
  });

 module.exports = schema;
