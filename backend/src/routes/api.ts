import { authenticateRouter } from './authenticate.routes';
import { cellRouter } from './cell.routes';
import { gameRouter } from './game.routes';
import { Router } from 'express';
import { teamRouter } from './team.routes';

export const apiRouter = Router();

apiRouter.get('/', (_req, res) => {
  res.send('{ "message": "API works" }');
});
apiRouter.use('/teams', teamRouter);
apiRouter.use('/cells', cellRouter);
apiRouter.use('/authenticate', authenticateRouter);
apiRouter.use('/game', gameRouter);

