import IUser from '../interfaces/IUser';
import users from '../database/models/users';

type LoginData = {
  email: string,
  password: string,
};

export interface ILoginService {
  usersModel: users;
  login(data: LoginData): Promise<IUser | null>
}

export default class LoginService implements ILoginService {
  usersModel: users;

  constructor(usersModel: users) {
    this.usersModel = usersModel;
  }

  static async login(data: LoginData): Promise<IUser | null> {
    const { email, password } = data;

    const result = await users.findOne({
      where: {
        email,
        password,
      },
    });

    return result;
  }
}
