import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

const validation = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  console.log('print body', req.body);
  const { error } = schema.validate(req.body);
  console.log('print error', error);

  if (error) {
    const [code, message] = error.message.split('|');
    return next({
      code: Number(code),
      message,
    });
  }

  return next();
};

export default validation;
