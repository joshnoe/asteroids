import GameObject from "./game-object";
import Hero from "./hero";
import Point from "./point";
import Polygon from "./polygon";
import AudioPlayer from "./audio-player";
import GameState from "./game-state";
import Velocity from "./velocity";
import AngleDirection from "./angle-direction";
import Dimensions from "./dimensions";

export default class HeroFactory {
    audioPlayer: AudioPlayer;
    gameState: GameState;

    constructor(audioPlayer: AudioPlayer, gameState: GameState) {
        this.audioPlayer = audioPlayer;
        this.gameState = gameState;
    }

    createSafeFromCollisions(enemies: Array<GameObject>) {
        const heroWidth = 14;
        const heroHeight = 20;
        const halfHeroWidth = heroWidth / 2;
        const halfHeroHeight = heroHeight / 2;
        const heroCoordinates : Array<Point> = [new Point(0, -(halfHeroHeight)), new Point(halfHeroWidth, halfHeroHeight), new Point(-(halfHeroWidth), halfHeroHeight)];
        const heroShape = new Polygon(heroCoordinates);
        const centerOfGame = new Point(this.gameState.gameWidth / 2, this.gameState.gameHeight / 2);
        const velocity = new Velocity(0, new AngleDirection(0));
        const weight = 10;

        const hero = new Hero(this.audioPlayer, centerOfGame, new Dimensions(heroWidth, heroHeight), velocity, weight, 50, .5, .2, heroShape);

        const isSafe = true; //!(enemies.some(e => e.wouldCollideWith(hero, 2)));

        return isSafe ? hero: null;
    }
}