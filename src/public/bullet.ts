import Point from "./point";
import Velocity from "./velocity";
import PointGameObject from "./point-game-object";
import Collidable from "./collidable";
import Collider from "./collider";
import Dimensions from "./dimensions";

const maxTravel: number = 500;

export default class Bullet extends PointGameObject implements Collidable {
    _distanceTravelled: number = 0;
    removeOnNextTick: boolean;
    collider: Collider;

    constructor(position: Point, velocity: Velocity) {
        super(position, velocity);
        this.collider = new Collider(new Dimensions(this.width, this.height), position);
    }

    updatePosition(secondsPassed: number) {
        super.updatePosition(secondsPassed);

        this._distanceTravelled+= secondsPassed * this.velocity.speed;
        if (this._distanceTravelled > maxTravel) {
            this.removeOnNextTick = true;
        }
    }
}