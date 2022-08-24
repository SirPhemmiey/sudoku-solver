"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const GameFactory_1 = require("./GameFactory");
class Game {
    static get factory() {
        if (!Game._factory) {
            Game._factory = new GameFactory_1.GameFactory();
        }
        return Game._factory;
    }
    init(name, parameters = {}) {
        return Game.factory.init(name, parameters);
    }
}
exports.Game = Game;
