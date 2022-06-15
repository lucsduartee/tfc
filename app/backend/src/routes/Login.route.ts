import { Router } from 'express';
import users from '../database/models/users';
import LoginService from '../services/Login.service';
import LoginController from '../controllers/Login.controller';
import validation from '../middlewares/Validation.middleware';
import LoginSchema from '../schemas/Login.shema';

const loginService = new LoginService(users);
const loginController = new LoginController(loginService);
const loginRouter: Router = Router();

loginRouter.post('/', validation(LoginSchema), async (req, res, next) => {
  await loginController.handleLogin(req, res, next);
});

export default loginRouter;
