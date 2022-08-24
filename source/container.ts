/**
 * In a real project, I'd rather use a dependency injection library to help manage this at scale instead of manually 
 * creating an injection container and exporting it
 */

import { Game } from "./business/Game/Game";

// const sudoku = new Sudoku();

const game = new Game();

export { game }


