"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveGame = exports.startGame = void 0;
const http_status_codes_1 = require("http-status-codes");
const Game_interfaces_1 = require("../../business/Game/Game.interfaces");
const container_1 = require("../../container");
const ApiResponse_1 = require("../../helpers/ApiResponse");
const constants_1 = require("../../helpers/constants");
const startGame = (request, response, _) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const body = request.body.gameType;
        //you can pass custom parameters for the game
        const result = container_1.game.init(body, {}).start();
        return ApiResponse_1.ApiResponse.handleSuccess(response, {
            status: constants_1.messages.SUCCESS,
            statusCode: http_status_codes_1.StatusCodes.OK,
            data: { result },
        });
    }
    catch (error) {
        console.error(error);
        return ApiResponse_1.ApiResponse.handleError(response, {
            status: constants_1.messages.FAILED,
            statusCode: (_b = (_a = error.httpErrorCode) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : http_status_codes_1.StatusCodes.BAD_REQUEST,
            data: { message: error.message },
        });
    }
});
exports.startGame = startGame;
const moveGame = (request, response, _) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const body = request.body;
        const row = Number(body.coordinates.toString().split(',')[0]);
        const column = Number(body.coordinates.toString().split(',')[1]);
        const result = container_1.game.init(Game_interfaces_1.GameType.Sudoku, {}).move(body.board, row, column, body.value);
        console.log({ result });
        return ApiResponse_1.ApiResponse.handleSuccess(response, {
            status: constants_1.messages.SUCCESS,
            statusCode: http_status_codes_1.StatusCodes.OK,
            data: { result },
        });
    }
    catch (error) {
        console.error(error);
        return ApiResponse_1.ApiResponse.handleError(response, {
            status: constants_1.messages.FAILED,
            statusCode: (_d = (_c = error.httpErrorCode) === null || _c === void 0 ? void 0 : _c.status) !== null && _d !== void 0 ? _d : http_status_codes_1.StatusCodes.BAD_REQUEST,
            data: { message: error.message },
        });
    }
});
exports.moveGame = moveGame;
