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
  login(data: LoginData): Promise<IUser | ICustomError | null>;
}

export default class LoginService implements ILoginService {
  public usersModel: typeof users;

  constructor(usersModel: typeof users) {
    this.usersModel = usersModel;
  }

  async login(data: LoginData): Promise<IUser | ICustomError | null> {
    const { email, passwordRaw } = data;
    const result = await this.usersModel.findOne({
      where: {
        email,
      },
    });

    console.log(result);

    if (!result) {
      return { code: 404, message: 'User not found' };
    }

    const { password, id, username, role } = result as users;
    const isValidPassword = await Bcryptjs.compare(passwordRaw, password);
    if (!isValidPassword) {
      return { code: 402, message: 'invalid passwd' } as ICustomError;
    }

    return { id, username, role, email };
  }
}
