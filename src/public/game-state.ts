import Bullet from "./bullet";

export default class GameState {
    gameHeight: number;
    gameWidth: number;
    maxAsteroidSpeed: number;
    bullets: Array<Bullet>;
    enemyBullets: Array<Bullet>;
    totalGameTime: number;
    score: number;

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.bullets = [];
        this.enemyBullets = [];

        // This should increase when the level increases?
        this.maxAsteroidSpeed = 200;
        this.totalGameTime = 0;
    }
}