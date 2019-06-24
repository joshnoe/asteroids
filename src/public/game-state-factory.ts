import GameState from "./game-state";

let gameState: GameState;

export default class GameStateFactory {

    static set(gameWidth: number, gameHeight: number) {
        gameState = new GameState(gameWidth, gameHeight);
    }

    static getSingle() {
        return gameState;
    }
}