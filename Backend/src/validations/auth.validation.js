const Joi = require('joi');

const signupSchema = Joi.object({
    fullName: Joi.string().required().trim().min(3).max(50),
    email: Joi.string().email().required().trim().lowercase(),
    password: Joi.string().required().min(6),
    collegeName: Joi.string().required().trim(),
    role: Joi.string().valid('student', 'college_admin', 'super_admin').default('student')
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().trim().lowercase(),
    password: Joi.string().required()
});

module.exports = {
    signupSchema,
    loginSchema
};
