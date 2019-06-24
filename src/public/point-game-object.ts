import GameObject from "./game-object";
import Velocity from "./velocity";
import Point from "./point";

export default class PointGameObject extends GameObject {
    constructor(position: Point, velocity: Velocity) {
        super(position, 1, 1, velocity);
    }
}