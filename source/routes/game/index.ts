import express from 'express';
import { moveGame, startGame } from '../../controllers/game';
import { validateGameStart, validateMoveGame } from '../../validator';

const router = express.Router();

router.post('/start', validateGameStart(), startGame);
router.post('/move', validateMoveGame(), moveGame);

export default router;


