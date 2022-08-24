import { Sudoku } from "../Sudokuu/Sudoku";
import { ISudoku } from "../Sudokuu/Sudoku.interfaces";
import { GameType, IObject } from "./Game.interfaces";

export class GameFactory {
  
    init(name: GameType, parameters: IObject): ISudoku {
      if (name === GameType.Sudoku) {
        return new Sudoku(parameters);
      }
      throw new Error(`Game ${name} is not supported yet`);
    }
  }