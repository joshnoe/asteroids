import Character from "./character";
import Velocity from "./velocity";
import Point from './point';
import Force from "./force";
import AngleDirection from "./angle-direction";
import AsteroidsControls from "./asteroids-controls";
import Polygon from "./polygon";
import Bullet from "./bullet";
import AudioPlayer from "./audio-player";

export default class Ship extends Character {
    thrustPower: number;

    // Seconds Per Full Circle
    turnRate: number;

    // Min seconds between each shot
    shotRate: number;

    _secondsSinceLastShot: number;
    _audioPlayer: AudioPlayer;

    constructor(audioPlayer: AudioPlayer, position: Point, width: number, height: number, velocity: Velocity, weight: number, thrustPower: number, turnRate: number, shotRate: number, shape: Polygon) {
        super(position, width, height, velocity, weight, shape);

        this._audioPlayer = audioPlayer;

        this.thrustPower = thrustPower;
        this.turnRate = turnRate;
        this.shotRate = shotRate;

        // so shot can be fired immediately at first
        this._secondsSinceLastShot = shotRate;
    }
}