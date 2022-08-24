"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameFactory = void 0;
const Sudoku_1 = require("../Sudoku/Sudoku");
const Game_interfaces_1 = require("./Game.interfaces");
class GameFactory {
    init(name, parameters) {
        if (name === Game_interfaces_1.GameType.Sudoku) {
            return new Sudoku_1.Sudoku(parameters);
        }
        throw new Error(`Game ${name} is not supported yet`);
    }
}
exports.GameFactory = GameFactory;
