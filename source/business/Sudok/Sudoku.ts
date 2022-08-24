import { IObject } from "../Game/Game.interfaces";
import { ISudoku, MoveResponse } from "./Sudoku.interfaces";

export class Sudoku implements ISudoku {

    constructor(private params: IObject) { }

    reset() {
        throw new Error("Method not implemented.");
    }

    private generateGrid() {
        const grid = new Array(81).fill(0);
        this.fillGrid(grid);
        return this.splitGrid(grid);
    }

    private splitGrid(grid: any[]) {
        const newGrid: any = [];
        grid.forEach((_, i) => {
            const row = Math.floor(i / 9);
            const col = Math.floor(i % 9);
            if (row % 3 === 0 && col % 3 === 0) {
                const { block } = this.getSudokuCoords(i, grid);
                newGrid.push(block);
            }
        });
        return newGrid;
    }

    private getSudokuCoords(i: number, grid: any[]) {
        const row = Math.floor(i / 9);
        const block = Math.floor((i - row * 9) / 3) + Math.floor(row / 3) * 3;
        const col = i % 9;

        const numsInRow = grid.slice(row * 9, (row + 1) * 9);
        const numsInBlock = [];

        for (let i = 0; i < 9; i++) {
            const startVal = Math.floor(block / 3) * 27 + (block % 3) * 3 + (i % 3);
            if (i < 3) numsInBlock.push(grid[startVal]);
            else if (i > 2 && i < 6) numsInBlock.push(grid[startVal + 9]);
            else numsInBlock.push(grid[startVal + 18]);
        }
        const numsInCol = [];
        for (let i = 0; i < 9; i++) {
            numsInCol.push(grid[col + i * 9]);
        }

        return { row: numsInRow, block: numsInBlock, col: numsInCol };
    }

    private shuffle(values: number[]) {
        let currentIndex = values.length;
        let randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [values[currentIndex], values[randomIndex]] = [
                values[randomIndex],
                values[currentIndex],
            ];
        }
        return values;
    }

    private isGridFull(grid: any[]) {
        return !grid.includes(0);
    }

    private fillGrid(grid: any[]) {
        const numsToTry = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let lastIndex = 0;
        for (let i = 0; i < grid.length; i++) {
            lastIndex = i;
            if (grid[i] === 0) {
                const { block, row, col } = this.getSudokuCoords(i, grid);
                const shuffledNums = this.shuffle(numsToTry);
                for (let j = 0; j < shuffledNums.length; j++) {
                    const num = shuffledNums[j];
                    if (
                        !block.includes(num) &&
                        !row.includes(num) &&
                        !col.includes(num)
                    ) {
                        grid[i] = num;
                        if (this.isGridFull(grid)) return true;
                        else {
                            if (this.fillGrid(grid)) return true;
                        }
                    }
                }
                break;
            }
        }
        grid[lastIndex] = 0;
    }

    private removeSudokuNumbers(
        sudokuNumbers: number[][],
        percentToRemove: number
    ) {
        const newSudokuNumbers = sudokuNumbers.map((block) => {
            return block.map((cell) => {
                const randomNum = Math.random();
                if (randomNum > percentToRemove / 100) return cell;
                return 0;
            });
        });
        return newSudokuNumbers;
    }

    public start() {
        const grid = this.generateGrid();
        // return {
        //   complete: grid,
        //   puzzle: this.removeSudokuNumbers(grid, this.params.difficulty || 10),
        // };
        return this.removeSudokuNumbers(grid, this.params.difficulty || 10);
    }

    private isValidBoard(board: number[][]) {
        //check row for duplicates
        for (let i = 0; i < board.length; i++) {
            const set = new Set();
            for (let j = 0; i < board[i].length; i++) {
                const currentCell = board[i][j];
                if (!currentCell) continue; //skip and continue to the next cell
                if (set.has(currentCell)) return false;
                set.add(currentCell);
            }
        }

        //check column for duplicates
        for (let i = 0; i < board.length; i++) {
            const set = new Set();
            for (let j = 0; i < board[i].length; i++) {
                const currentCell = board[j][i];
                if (!currentCell) continue; //skip and continue to the next cell
                if (set.has(currentCell)) return false;
                set.add(currentCell);
            }
        }

        //i and j rep the sub boxes
        //k and l rep individual elements of the sub boxes
        //3 times the row of sub box serve as the offset to the row of individual elements withint to the sub boxes
        //when it comes to the overal board

        //chceck sub box
        for (let i = 0; i < 3; i++) { //3 rows of sub boxes
            for (let j = 0; j < 3; j++) { //cols of the sub boxes
                const set = new Set();
                for (let k = 0; k < 3; k++) { //represents the rows elements inside the sub box
                    for (let l = 0; l < 3; l++) { //represents the column elements inside the sub box
                        const currentCell = board[3 * i + k][3 * j + l];
                        if (!currentCell) continue; //skip and continue to the next cell
                        if (set.has(currentCell)) return false;
                    }
                }
            }
        }
        return true;
    }

    //after user plays the move function, it's added to the board and validated if the number is valid in the board or not
    public move(board: any[][], r: number, c: number, value: number): false | MoveResponse {
        // if (!this.isValid(board, r, c, value)) {
        //     return false;
        // }
        board[r][c] = value;

        return {
            board,
            isSolved: this.isValidSudoku(board), //win detection
        };
    }

    /**@deprecated */

    private isValid(board: any[][], r: number, c: number, value: number) {
        if (board.length < 0) return false;
        if (value < 0 || value > 9) return false;
        for (let row = 0; row < 9; row++) {
            console.log({ row: board[row][c] });
            if (board[row][c] === value) return false;
        }
        for (let col = 0; col < 9; col++) {
            console.log({ col: board[r][col] })
            if (board[r][col] === value) return false;
        }
        for (let row = (r / 3) * 3; row < (r / 3 + 1) * 3; row++) {
            for (let col = (c / 3) * 3; col < (c / 3 + 1) * 3; col++) {
                console.log({ box: board[row][col] });
                if (board[row][col] === value) return false;
            }
        }
        return true;
    }

    private validate(board: number[]) {
        // filter out the zeros
        const digits = board.filter((character) => !character);
        return digits.length === [...new Set(digits)].length;
    };

    private isValidSudoku(board: number[][]) {

        const [validated, grids]: [boolean[], any[]] = [[], []];

        board.forEach((row, rowIndex) => {
            // rows
            validated.push(this.validate(row));

            // columns
            const column = [];
            for (let columnIndex = 0; columnIndex < board.length; columnIndex++) {
                column.push(board[columnIndex][rowIndex]);
            }
            validated.push(this.validate(column));

            //grids
            grids.push([]);
        });

        //grids
        board.forEach((row, rowIndex) => {
            row.forEach((character, charIndex) => {
                let gridRow = 0;
                if (rowIndex >= 3 && rowIndex <= 5) {
                    gridRow = 1;
                } else if (rowIndex >= 6 && rowIndex <= 8) {
                    gridRow = 2;
                }

                if (charIndex >= 3 && charIndex <= 5) {
                    gridRow += 3;
                } else if (charIndex >= 6 && charIndex <= 8) {
                    gridRow += 6;
                }

                grids[gridRow].push(character);
            });
        });

        grids.forEach((grid) => {
            validated.push(this.validate(grid));
        });

        return validated.every((value) => value === true);
    };

    public solve(board: number[][]) {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (!board[r][c]) { //if not 0 or falsey
                    for (let d = 1; d <= 9; d++) {
                        if (this.isValid(board, r, c, d)) {
                            board[r][c] = d;
                            if (this.solve(board)) {
                                return true;
                            }
                            board[r][c] = 0
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

}


// const sd = new Sudoku({ difficulty: 20 });
// let grid = sd.start();
// console.log({grid, isValid: sd.isValid(grid, 3, 8, 4), isValidBoard: sd.isValidBoard(grid)})
// console.log({move: sd.move(grid, 3, 8, 4)});

