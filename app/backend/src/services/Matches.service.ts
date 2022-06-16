import matches from '../database/models/matches';

export default class MatchesService {
  public matchesModel: typeof matches;

  constructor(matchesModel: typeof matches) {
    this.matchesModel = matchesModel;
  }
}