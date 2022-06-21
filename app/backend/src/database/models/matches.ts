import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import teams from './teams';

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
  modelName: 'matches',
  timestamps: false,
});

matches.hasMany(teams, {
  sourceKey: 'id',
  foreignKey: 'homeTeam',
});

matches.hasMany(teams, {
  sourceKey: 'id',
  foreignKey: 'awayTeam',
});

export default matches;
