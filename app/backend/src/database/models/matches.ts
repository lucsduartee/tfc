import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

class matches extends Model {
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeamGoals!: number;
  public awayTeam!: number;
  public inProgress!: boolean;
}

matches.init({
  homeTeam: {
    type: INTEGER,
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeamGoals: {
    type: INTEGER,
  },
  awayTeam: {
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default matches;
