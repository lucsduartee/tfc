import teams from '../database/models/teams';
import matches from '../database/models/matches';
import IMatches from '../interfaces/IMatches';
import IMatchData from '../interfaces/IMatchData';

export default class MatchesService {
  public matchesModel: typeof matches;

  constructor(matchesModel: typeof matches) {
    this.matchesModel = matchesModel;
  }

  async getAll(): Promise<IMatches[]> {
    const result = this.matchesModel.findAll({
      include: [
        { model: teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return result;
  }

  async saveMatch(matchData: IMatchData) {
    const { awayTeam, awayTeamGoals, homeTeam, homeTeamGoals, inProgress = true } = matchData;
    const result = this.matchesModel
      .create({ awayTeam, awayTeamGoals, homeTeam, homeTeamGoals, inProgress });

    return result;
  }

  async updateMatch(id: number) {
    const result = await this.matchesModel
      .update({ inProgress: false }, { where: { id } });

    return result;
  }

  async updateEntireMatch(matchData: IMatchData, id: number) {
    const result = await this.matchesModel
      .update(matchData, { where: { id } });

    return result;
  }
}
