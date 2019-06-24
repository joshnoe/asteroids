import Bullet from "./bullet";

export default class GameState {
    gameHeight: number;
    gameWidth: number;
    maxAsteroidSpeed: number;
    bullets: Array<Bullet>;

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.bullets = [];

        // This should increase when the level increases?
        this.maxAsteroidSpeed = 200;
    }
}