import AngleDirection from "./angle-direction";
import Point from "./point";

export default class Vector {
    magnitude: number;
    direction: AngleDirection;

    constructor(magnitude: number, direction: AngleDirection) {
        this.magnitude = magnitude;
        this.direction = direction;
    }

    static fromPoint(point: Point): Vector {
        const magnitude = Math.sqrt((point.x * point.x) + (point.y * point.y));
        const direction = new AngleDirection(Math.atan2(point.y, point.x));

        return new Vector(magnitude, direction);
    }

    static fromPoints(pointA: Point, pointB: Point): Vector {
        const point = pointB.subtract(pointA);

        const magnitude = Math.sqrt((point.x * point.x) + (point.y * point.y));
        const direction = new AngleDirection(Math.atan2(point.y, point.x));

        return new Vector(magnitude, direction);
    }

    get xMagnitude(): number {
        return this.magnitude * Math.cos(this.direction.angle);
    }

    get yMagnitude(): number {
        return this.magnitude * Math.sin(this.direction.angle);
    }

    get endPoint(): Point {
        return new Point(this.xMagnitude, this.yMagnitude);
    }

    rotate(angle: AngleDirection) {
        this.direction.add(angle);
    }

    add(other: Vector) {
        let newXMagnitude = this.xMagnitude + other.xMagnitude;
        let newYMagnitude = this.yMagnitude + other.yMagnitude;

        let newAngle = Math.atan2(newYMagnitude, newXMagnitude);
        let newMagnitude = Math.sqrt(Math.pow(newXMagnitude, 2) + Math.pow(newYMagnitude, 2));

        return new Vector(newMagnitude, new AngleDirection(newAngle));
    }

    subtract(other: Vector) {
        let newXMagnitude = this.xMagnitude - other.xMagnitude;
        let newYMagnitude = this.yMagnitude - other.yMagnitude;

        let newAngle = Math.atan2(newYMagnitude, newXMagnitude);
        let newMagnitude = Math.sqrt(Math.pow(newXMagnitude, 2) + Math.pow(newYMagnitude, 2));

        return new Vector(newMagnitude, new AngleDirection(newAngle));
    }

        // apply(other: Vector) {
    //     let newXMagnitude = this.xMagnitude + other.xMagnitude;
    //     let newYMagnitude = this.yMagnitude + other.yMagnitude;
    //
    //     this.direction.angle = Math.atan2(newYMagnitude, newXMagnitude);
    //     this.magnitude = Math.sqrt(Math.pow(newXMagnitude, 2) + Math.pow(newYMagnitude, 2));
    // }
}