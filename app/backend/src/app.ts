import * as express from 'express';
import ErrorMiddleware from './middlewares/Error.middleware';
import loginRouter from './routes/Login.route';
import teamsRouter from './routes/Teams.route';
import matchesRouter from './routes/Matches.route';
import leaderboardHomeRouter from './routes/LeaderboardHome.route';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use('/login', loginRouter);
    this.app.use('/teams', teamsRouter);
    this.app.use('/matches', matchesRouter);
    this.app.use('/leaderboard/home', leaderboardHomeRouter);
    this.app.use(ErrorMiddleware.validate);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Running on ${PORT}`);
    });
  }
}

export { App };

export const { app } = new App();
