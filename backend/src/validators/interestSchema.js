const Joi = require('joi');

// Define the validation schema for the interest form using Joi.
const interestSchema = Joi.object({
    student_name : Joi.string()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.max': 'Name must be less than 100 characters'
        }),

        student_email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'An email is required'
        }),

        student_program: Joi.string()
        .max(200)
        .allow('') // Allow empty string for optional field if they don't have a program
        .messages({
            'string.max': 'Program must be less than 200 characters'
        }),

        message: Joi.string()
        .max(2000)
        .allow('') // Allow empty string for optional field if they don't have a message...but re-evaluate this decision later
        .messages({
            'string.max': 'Message must be less than 2000 characters'
        }),

        professor_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Please select a professor',
            'any.required': 'You must select a professor' // TODO: consider allowing students to submit a message even if they've not selected a professor yet...
        })

});

module.exports = interestSchema;