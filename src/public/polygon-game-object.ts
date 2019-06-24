import GameObject from "./game-object";
import Polygon from "./polygon";
import Point from "./point";
import Velocity from "./velocity";
import AngleDirection from "./angle-direction";
import Vector from "./vector";
import Force from "./force";

export default class PolygonGameObject extends GameObject {
    shape: Polygon;
    facingDirection: AngleDirection;

    constructor(position: Point, width: number, height: number, magnitude: Velocity, shape: Polygon) {
        super(position, width, height, magnitude);

        this.shape = shape;
    }

    getShapePointPositionX(pointIndex: number): number {
        return this.position.x + this.shape.points[pointIndex].x;
    }

    getShapePointPositionY(pointIndex: number): number {
        return this.position.y + this.shape.points[pointIndex].y;
    }

    applyForce(force: Force, weight: number) {
        let oldForce = this.velocity.getForce(weight);
        let newForce = oldForce.add(force);
        let newSpeed = newForce.magnitude / weight;
        this.velocity = new Velocity(newSpeed, newForce.direction);
    }

    _rotate(aroundPoint: Point, direction: AngleDirection): void {
        this.facingDirection.add(direction);
        const relativeAroundPoint = aroundPoint.subtract(this.position);

        this.shape.rotate(direction);

        const combinedVector = Vector.fromPoints(aroundPoint, this.position);
        combinedVector.rotate(direction);

        this.position.x += combinedVector.endPoint.x + relativeAroundPoint.x;
        this.position.y += combinedVector.endPoint.y + relativeAroundPoint.y;
    }
}