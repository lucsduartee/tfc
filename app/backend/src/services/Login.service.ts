import * as Bcryptjs from 'bcryptjs';
import IUser from '../interfaces/IUser';
import users from '../database/models/users';
import ICustomError from '../interfaces/ICustomError';

type LoginData = {
  email: string;
  passwordRaw: string;
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

  static async validatePassword(passwordRaw: string, password: string): Promise<boolean> {
    const isValidPassword = await Bcryptjs.compare(passwordRaw, password);
    return isValidPassword;
  }
}
