import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';

type LoginData = {
  email: string,
  passwordRaw: string,
};

export default class Token {
  static async getKey(): Promise<string> {
    const masterKey = await fs.readFile('./jwt.evaluation.key', 'utf-8');
    return masterKey;
  }

  static async generate(data: LoginData): Promise<string> {
    const masterKey = await Token.getKey();
    const token = jwt.sign(data, masterKey, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });

    return token;
  }

  static async validate(token: string): Promise<jwt.JwtPayload> {
    const masterKey = await Token.getKey();
    const decoded = jwt.verify(token, masterKey);
    return decoded as jwt.JwtPayload;
  }
}
