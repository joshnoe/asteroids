import PointGameObject from "./point-game-object";
import Velocity from "./velocity";
import AngleDirection from "./angle-direction";
import Point from "./point";
import GameObject from "./game-object";

export default class Explosion extends GameObject {
    points: Array<PointGameObject>;
    lifetimeInSeconds: number;
    totalSecondsPassed: number = 0;

    constructor(position: Point, points: Array<PointGameObject>, lifetimeInSeconds: number) {
        super(position, 0, 0, new Velocity(0, new AngleDirection(0)));

        this.points = points;
        this.lifetimeInSeconds = lifetimeInSeconds;
    }

    updatePosition(secondsPassed: number) {
        this.totalSecondsPassed+= secondsPassed;
        if (this.totalSecondsPassed >= this.lifetimeInSeconds) {
            this.removeOnNextTick = true;
        }

        this.points.forEach(p => p.updatePosition(secondsPassed));
    }

    getShapePointPositionX(pointIndex: number): number {
        return this.position.x + this.points[pointIndex].position.x;
    }

    getShapePointPositionY(pointIndex: number): number {
        return this.position.y + this.points[pointIndex].position.y;
    }
}