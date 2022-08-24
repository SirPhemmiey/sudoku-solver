

export interface MoveResponse {
    board: any[][];
    isSolved: boolean;
}

export interface ISudoku {
    start(): number[][];
    reset(): void;
    move(board: any[][], r: number, c: number, value: number): false | MoveResponse;
}
