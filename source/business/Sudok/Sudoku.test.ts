//https://www.codefellows.org/blog/sudoku-solver-from-scratch-in-javascript-tdd-style-a-tutorial/

import { Sudoku } from "./Sudoku";

//test to hsould parse a sudoku board into a 2D array

/** 
 * @group unit
*/

describe('Sudoku', () => {

    const sudoku = new Sudoku({});

    it('should not be a fully solved board on start', () => {
        const startingBoard = sudoku.start();
        const hasZero = () => {
            for (let i = 0; i < startingBoard.length; i++) {
                for (let j = 0; j < startingBoard[i].length; j++) {
                    if (startingBoard[i][j] === 0 || startingBoard[j][i] === 0) {
                        return true;
                    }
                }
            }
            return false;
        };
        expect(hasZero()).toBe(true);
    });

    it('should verify that starting board is a 2D array', () => {
        const startingBoard = sudoku.start();
        const isMultidimensional = () => startingBoard[0].constructor == Array;
        expect(isMultidimensional()).toBe(true);
    });
});