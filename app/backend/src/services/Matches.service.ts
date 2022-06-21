import teams from '../database/models/teams';
import matches from '../database/models/matches';
import IMatches from '../interfaces/IMatches';

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
}
