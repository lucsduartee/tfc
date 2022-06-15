import * as Joi from 'joi';

enum Errors {
  REQUIREDS = '400|All fields must be filled',
  STRING_EMPTY = '400|All fields must be filled',
}

export default Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': Errors.REQUIREDS,
    'string.empty': Errors.REQUIREDS,
  }),
  password: Joi.string().required().messages({
    'any.required': Errors.REQUIREDS,
    'string.empty': Errors.REQUIREDS,
  }),
});
