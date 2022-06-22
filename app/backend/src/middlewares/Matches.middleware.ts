import { Request, Response, NextFunction } from 'express';
import teams from '../database/models/teams';

export default class MatchesMiddleware {
  static async validate(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;
    const homeTeamFromDB = await teams.findByPk(homeTeam);
    const awayTeamFromDB = await teams.findByPk(awayTeam);

    if (!homeTeamFromDB || !awayTeamFromDB) {
      return res.status(404)
        .json({ message: 'There is no team with such id!' });
    }

    if (homeTeam === awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    return next();
  }
}
