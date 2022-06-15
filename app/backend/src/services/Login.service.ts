import * as Bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import users from '../database/models/users';
import ICustomError from '../interfaces/ICustomError';
import Token from '../utils/Token';

type LoginData = {
  email: string;
  passwordRaw: string;
};

type LoginJWT = {
  email: string;
  password: string;
};

export interface ILoginService {
  usersModel: typeof users;
  login(data: LoginData): Promise<IUser | ICustomError | undefined>;
}

export default class LoginService implements ILoginService {
  public usersModel: typeof users;

  constructor(usersModel: typeof users) {
    this.usersModel = usersModel;
  }

  async login(data: LoginData): Promise<IUser | ICustomError | undefined> {
    const { email, passwordRaw } = data;
    const result = await this.usersModel.findOne({
      where: {
        email,
      },
    });

    if (!result) {
      return { code: 401, message: 'Incorrect email or password' } as ICustomError;
    }

    const { id, username, role, password } = result as users;
    const isValid = await LoginService.validatePassword(passwordRaw, password);

    if (!isValid) {
      return { code: 401, message: 'Incorrect email or password' } as ICustomError;
    }

    const user = { id, username, role, email };
    return user;
  }

  async getUser(data: LoginJWT): Promise<IUser | ICustomError> {
    const { email: emailRaw, password: passwordRaw } = data;
    const result = await this.usersModel.findOne({
      where: {
        email: emailRaw,
      },
    });
    const { id, username, role, email, password } = result as users;
    const isValid = await LoginService.validatePassword(passwordRaw, password);
    if (isValid) {
      const user = { id, username, role, email };
      return user;
    }
    return { code: 402, message: 'User invalid' };
  }

  static async validate(token: string): Promise<jwt.JwtPayload> {
    const result = await Token.validate(token);
    return result;
  }

  static async validatePassword(passwordRaw: string, password: string): Promise<boolean> {
    const isValidPassword = await Bcryptjs.compare(passwordRaw, password);
    return isValidPassword;
  }
}
