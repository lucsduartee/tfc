import { Router } from 'express';
import matches from '../database/models/matches';
import MatchesService from '../services/Matches.service';
import MatchesController from '../controllers/Matches.controller';
import MatchesMiddleware from '../middlewares/Matches.middleware';

const matchesService = new MatchesService(matches);
const matchesController = new MatchesController(matchesService);
const matchesRouter = Router();

matchesRouter.get('/', async (req, res, next) => {
  await matchesController.getAll(req, res, next);
});

matchesRouter
  .post(
    '/',
    async (req, res, next) => {
      await MatchesMiddleware.validate(req, res, next);
    },
    async (req, res, next) => {
      await matchesController.saveMatch(req, res, next);
    },
  );

matchesRouter
  .patch(
    '/:id/finish',
    async (req, res, next) => {
      await matchesController.updateMatch(req, res, next);
    },
  );

export default matchesRouter;
