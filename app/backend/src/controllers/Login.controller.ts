import { Request, Response, NextFunction } from 'express';
import ICustomError from '../interfaces/ICustomError';
import Token from '../utils/Token';
import LoginService from '../services/Login.service';
import IUser from '../interfaces/IUser';

export interface ILoginController {
  loginService: LoginService;
  handleLogin(req: Request, res: Response, next: NextFunction): void;
  validate(req: Request, res: Response, next: NextFunction): void;
}

export default class LoginController {
  public loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  async handleLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password: passwordRaw } = req.body;
      const result = await this.loginService.login({ email, passwordRaw });

      if ((result as ICustomError).code) {
        return next(result);
      }

      const token = await Token.generate({ email, passwordRaw });
      return res.status(200).json({ user: result, token });
    } catch (err) {
      return next(err);
    }
  }

  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization as string;
      if (token) {
        const jwtPayload = await LoginService.validate(token);
        const { email, password } = jwtPayload;
        const user = await this.loginService.getUser({ email, password });

        const { role } = user as IUser;
        return res.status(200).send(role);
      }
    } catch (err) {
      return next(err);
    }
  }
}
