"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMoveGame = exports.validateGameStart = exports.gameTypes = void 0;
const express_validator_1 = require("express-validator");
const _1 = require(".");
const Game_interfaces_1 = require("../business/Game/Game.interfaces");
exports.gameTypes = Object.values(Game_interfaces_1.GameType);
const validateGameStart = () => {
    return _1.Validate([
        express_validator_1.check('gameType').notEmpty().isIn(exports.gameTypes).withMessage('game not supported'),
    ]);
};
exports.validateGameStart = validateGameStart;
const validateMoveGame = () => {
    return _1.Validate([
        express_validator_1.check('board').notEmpty().isArray(),
        express_validator_1.check('coordinates').notEmpty().isArray(),
        express_validator_1.check('value').notEmpty().isNumeric(),
    ]);
};
exports.validateMoveGame = validateMoveGame;
