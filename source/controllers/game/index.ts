import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { GameType } from "../../business/Game/Game.interfaces";
import { game } from "../../container";
import { ApiResponse } from "../../helpers/ApiResponse";
import { messages } from "../../helpers/constants";

export const startGame = async (request: Request, response: Response, _: NextFunction) => {
  try {
    const body = request.body.gameType as GameType;
    //you can pass custom parameters for the game
    const result = game.init(body, {}).start();
    return ApiResponse.handleSuccess(response, {
      status: messages.SUCCESS,
      statusCode: StatusCodes.OK,
      data: { result },
    });
  } catch (error: any) {
    console.error(error);
    return ApiResponse.handleError(response, {
      status: messages.FAILED,
      statusCode: error.httpErrorCode?.status ?? StatusCodes.BAD_REQUEST,
      data: { message: error.message },
    });
  }
}

export const moveGame = async (request: Request, response: Response, _: NextFunction) => {
  try {
    const body = request.body as {board: number[][], coordinates: [], value: number};
    const row = Number(body.coordinates.toString().split(',')[0]);
    const column = Number(body.coordinates.toString().split(',')[1]);
    const result = game.init(GameType.Sudoku, {}).move(body.board, row, column, body.value);
    return ApiResponse.handleSuccess(response, {
      status: messages.SUCCESS,
      statusCode: StatusCodes.OK,
      //data: {result: result}
      data: { result: result? result: 'The move is invalid, check again :)' },
    });
  } catch (error: any) {
    console.error(error);
    return ApiResponse.handleError(response, {
      status: messages.FAILED,
      statusCode: error.httpErrorCode?.status ?? StatusCodes.BAD_REQUEST,
      data: { message: error.message },
    });
  }
}