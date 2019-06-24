import Segment from "./segment";
import Point from "./point";

export default class Line {
    a: number;
    b: number;
    c: number;

    constructor(a: number, b: number, c: number) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    static fromSegment(segment: Segment) {
        const a = segment.y2 - segment.y1;
        const b = segment.x1 - segment.x2;
        const c = a * segment.x1 + b * segment.y1;

        return new Line(a, b, c);
    }

    // https://www.topcoder.com/community/competitive-programming/tutorials/geometry-concepts-line-intersection-and-its-applications/
    getIntersect(other: Line) : Point {
        const det = this.a * other.b - other.a * this.b;

        // lines are parallel
        if (det == 0) {
            //TODO: use Maybe instead
            return null;
        }

        const x = (other.b * this.c - this.b * other.c) / det;
        const y = (this.a * other.c - other.a * this.c) / det;

        return new Point(x, y);
    }
}