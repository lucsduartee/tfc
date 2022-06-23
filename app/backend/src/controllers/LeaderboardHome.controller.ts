import { Request, Response, NextFunction } from 'express';
import LeaderboardHomeService from '../services/LeaderboardHome.service';

export default class LeaderboardHomeController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboardHome = await LeaderboardHomeService.leaderboardFactory();

      return res.status(200).json(leaderboardHome);
    } catch (err) {
      next(err);
    }
  }
}
