const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  category: Joi.string()
    .max(245)
    .min(4)
    .required()
  ,
  description: Joi.string()
    .min(5)
    .required()
});

module.exports = schema;