import { Router } from 'express';
import matches from '../database/models/matches';
import MatchesService from '../services/Matches.service';
import MatchesController from '../controllers/Matches.controller';

const matchesService = new MatchesService(matches);
const matchesController = new MatchesController(matchesService);
const matchesRouter = Router();

matchesRouter.get('/', async (req, res, next) => {
  await matchesController.getAll(req, res, next);
});

export default matchesRouter;
