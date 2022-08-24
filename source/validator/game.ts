
import { check } from "express-validator";
import { Validate } from ".";
import { GameType } from "../business/Game/Game.interfaces";

export const gameTypes = Object.values<GameType>(GameType);

export const validateGameStart = () => {
    return Validate([
      check('gameType').notEmpty().isIn(gameTypes).withMessage('game not supported'),
    ]);
  }
  

  export const validateMoveGame = () => {
    return Validate([
      check('board').notEmpty().isArray(),
      check('coordinates').notEmpty().isArray(),
      check('value').notEmpty().isNumeric(),
    ]);
  }
  