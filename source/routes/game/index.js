"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_1 = require("../../controllers/game");
const validator_1 = require("../../validator");
const router = express_1.default.Router();
router.post('/start', validator_1.validateGameStart(), game_1.startGame);
router.post('/move', validator_1.validateMoveGame(), game_1.moveGame);
exports.default = router;
