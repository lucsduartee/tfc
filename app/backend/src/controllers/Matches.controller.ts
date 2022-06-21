import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  public matchesService: MatchesService;

  constructor(matchesService: MatchesService) {
    this.matchesService = matchesService;
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.matchesService.getAll();
      return res.status(200).json(matches);
    } catch (err) {
      return next(err);
    }
  }

  async saveMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const matchCreated = await this.matchesService.saveMatch(req.body);
      return res.status(201).json(matchCreated);
    } catch (err) {
      return next(err);
    }
  }
}
