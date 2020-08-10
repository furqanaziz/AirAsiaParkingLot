const Joi = require('@hapi/joi');

const LoginSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email(),
  password: Joi.string().required()
});

const CarParkSchema = Joi.object().keys({
  number: Joi.string()
    .required(),
  color: Joi.string()
    .required(),
  type: Joi.string()
    .required()
});

module.exports = {
  LoginSchema,
  CarParkSchema
}