import { Request, Response, NextFunction } from 'express';
import Errors from '../enums/Errors';
import ICustomError from '../interfaces/ICustomError';

export default class ErrorMiddleware {
  static async validate(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    console.log('no mid de error', err);
    if ((err as ICustomError).code) {
      return res.status((err as ICustomError).code)
        .json({ message: (err as ICustomError).message });
    }

    return res.status(Errors.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error' });
  }
}
