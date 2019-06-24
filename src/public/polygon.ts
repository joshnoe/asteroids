import Point from "./point";
import * as _ from "lodash";
import Vector from "./vector";
import AngleDirection from "./angle-direction";

export default class Polygon {
    points: Array<Point>;
    center: Point;

    constructor(points: Array<Point>) {
        this.points = points;
        this._updateCenter();
    }

    static fromMatrix(matrix: Array<Array<number>>): Polygon {
        const points = matrix.map(point => new Point(point[0], point[1]));
        return new Polygon(points);
    }

    rotate(angle: AngleDirection): void {
        this.points = this.points.map(p => {
            const combinedVector = Vector.fromPoint(p);
            combinedVector.rotate(angle);

            return new Point(combinedVector.endPoint.x, combinedVector.endPoint.y)
        });
    }

    _updateCenter() {
        const x = _.sumBy(this.points, p => p.x) / this.points.length;
        const y = _.sumBy(this.points, p => p.y) / this.points.length;

        this.center = new Point(x, y);
    }
}