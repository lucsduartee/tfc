import { Router } from 'express';
import teams from '../database/models/teams';
import TeamsController from '../controllers/Teams.controller';
import TeamsService from '../services/Teams.service';

const teamsService = new TeamsService(teams);
const teamsController = new TeamsController(teamsService);

const teamRouter = Router();

teamRouter.get('/', async (req, res, next) => {
  await teamsController.getAll(req, res, next);
});

teamRouter.get('/:id', async (req, res, next) => {
  await teamsController.getById(req, res, next);
});

export default teamRouter;
