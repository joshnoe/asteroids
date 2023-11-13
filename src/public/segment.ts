import Point from "./point";
import Line from "./line";

export default class Segment {
    pointA: Point;
    pointB: Point;

    constructor(pointA: Point, pointB: Point) {
        this.pointA = pointA;
        this.pointB = pointB;
    }

    get x1() : number {
        return this.pointA.x;
    }

    get x2() : number {
        return this.pointB.x;
    }

    get y1() : number {
        return this.pointA.y;
    }

    get y2() : number {
        return this.pointB.y;
    }

    static fromPoints(ax: number, ay: number, bx: number, by: number) {
        return new Segment(new Point(ax, ay), new Point(bx, by));
    }

    intersects(other: Segment) : boolean {
        // get intersection of two lines
        const thisLine =  Line.fromSegment(this);
        const otherLine = Line.fromSegment(other);

        const intersect = thisLine.getIntersect(otherLine);

        // lines never intersect (are parallel)
        if (intersect == null) {
            // TODO: check for collinearity (parallel slope but overlapping)
            return false;
        }

        if (!this._containsLinePoint(intersect)) {
            return false;
        }

        return other._containsLinePoint(intersect);
    }

    positionAt(point: Point) {
        return new Segment(this.pointA.add(point), this.pointB.add(point)); 
    }

    _containsLinePoint(linePoint: Point) {
        // check if intersection is in both segments
        const minX = Math.min(this.x1, this.x2);
        const maxX = Math.max(this.x1, this.x2);

        // small optimization, check x first and return false early
        if (linePoint.x < minX || linePoint.x > maxX) {
            return false;
        }

        const minY = Math.min(this.y1, this.y2);
        const maxY = Math.max(this.y1, this.y2);

        return linePoint.y >= minY && linePoint.y <= maxY;
    }
}