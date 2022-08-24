"use strict";
/**
 * In a real project, I'd rather use a dependency injection library to help manage this at scale instead of manually
 * creating an injection container and exporting it
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.game = void 0;
const Game_1 = require("./business/Game/Game");
// const sudoku = new Sudoku();
const game = new Game_1.Game();
exports.game = game;
