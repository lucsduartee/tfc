import { Router } from 'express';
import LeaderboardHomeController from '../controllers/LeaderboardHome.controller';

const leaderboardHomeRoute = Router();

leaderboardHomeRoute.get('/', async (req, res, next) => {
  await LeaderboardHomeController.getAll(req, res, next);
});

export default leaderboardHomeRoute;
