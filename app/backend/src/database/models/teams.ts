import { Model, STRING } from 'sequelize';
import db from '.';

class teams extends Model {
  public teamName!: string;
}

teams.init({
  teamName: {
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default teams;
