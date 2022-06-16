import ITeams from '../interfaces/ITeams';
import teams from '../database/models/teams';

export default class TeamsService {
  public teamsModel: typeof teams;

  constructor(teamsModel: typeof teams) {
    this.teamsModel = teamsModel;
  }

  async getAll(): Promise<ITeams[]> {
    const result = await this.teamsModel.findAll();

    return result;
  }

  async getById(id: string): Promise<ITeams | null> {
    const team = await this.teamsModel.findByPk(Number(id));
    return team;
  }
}
