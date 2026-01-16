const Joi = require('joi');

const signupSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  collegeName: Joi.string().required(),
  role: Joi.string().valid('student', 'college_admin').required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { signupSchema, loginSchema };