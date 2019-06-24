import Point from './point';
import Velocity from "./velocity";
import Force from "./force";
import Polygon from "./polygon";
import PolygonGameObject from "./polygon-game-object";

export default class Character extends PolygonGameObject {
    position: Point;
    velocity: Velocity;
    weight: number;
    isAlive: boolean;

    constructor(position: Point, width: number, height: number, velocity: Velocity, weight: number, shape: Polygon) {
        super(position, width, height, velocity, shape);

        this.position = position;
        this.velocity = velocity;
        this.weight = weight;
        this.isAlive = true;
    }
}