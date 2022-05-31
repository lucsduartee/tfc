import { Model, STRING } from 'sequelize';
import db from '.';

class users extends Model {
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

users.init({
  username: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default users;
