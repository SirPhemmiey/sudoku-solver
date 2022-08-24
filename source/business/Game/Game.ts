import { GameType, IObject } from "./Game.interfaces";
import { GameFactory } from "./GameFactory";

export class Game {

    static _factory: GameFactory;

    static get factory() {
        if (!Game._factory) {
            Game._factory = new GameFactory();
        }
        return Game._factory;
    }

    public init(name: GameType, parameters: IObject = {}) {
        return Game.factory.init(name, parameters);
    }
}