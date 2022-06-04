import { Router } from 'express';
import users from '../database/models/users';
import LoginService from '../services/Login.service';
import LoginController from '../controllers/Login.controller';

const loginService = new LoginService(users);
const loginController = new LoginController(loginService);
const loginRouter: Router = Router();

loginRouter.post('/', loginController.handleLogin);

export default loginRouter;
