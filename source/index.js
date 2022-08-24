"use strict";
//https://docs.orderful.com/reference/best-practices
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const game_1 = __importDefault(require("./routes/game"));
exports.app = express_1.default();
exports.app.use(cors_1.default({ origin: true }));
exports.app.use(express_1.default.json());
exports.app.use(morgan_1.default("tiny"));
exports.app.get('/health', (req, res) => {
    res.json({ status: 'up' });
});
exports.app.use('/v1/game', game_1.default);
