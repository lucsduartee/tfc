import * as Joi from 'joi';

enum Errors {
  REQUIREDS = '400|All fields must be filled',
}

export default Joi.object({
  email: Joi.string().required().messages({
    'any.required': Errors.REQUIREDS,
  }),
  password: Joi.string().required().messages({
    'any.required': Errors.REQUIREDS,
  }),
});
