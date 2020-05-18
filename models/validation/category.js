const Joi = require('@hapi/joi');

const categorySchema = Joi.object({
  category: Joi.string()
    .max(245)
    .min(5)
    .required()
  ,
  description: Joi.string()
    .min(5)
    .required()
});

module.exports = categorySchema;