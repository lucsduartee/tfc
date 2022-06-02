import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/Login.service';

export interface ILoginController {
  loginService: LoginController;
  handleLogin(req: Request, res: Response, next: NextFunction): void;
}

export default class LoginController {
  public loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  async handleLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await this.loginService.login({ email, password });

      return res.status(200).json({ message: 'Login feito', result });
    } catch (err) {
      return next(err);
    }
  }
}
