import { authenticateRouter } from './authenticate.routes';
import { cellRouter } from './cell.routes';
import { gameRouter } from './game.routes';
import { Router } from 'express';
import { teamRouter } from './team.routes';

export const router = Router();

router.get('/', (_req, res) => {
  res.send('{ "message": "API works" }');
});
router.use('/teams', teamRouter);
router.use('/cells', cellRouter);
router.use('/authenticate', authenticateRouter);
router.use('/game', gameRouter);

