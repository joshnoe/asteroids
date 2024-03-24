import Point from "./point";
import * as _ from "lodash";
import Vector from "./vector";
import AngleDirection from "./angle-direction";

export default class Polygon {
    points: Array<Point>;
    center: Point;
    isOpenPath: boolean;

    constructor(points: Array<Point>, isOpenPath: boolean = false) {
        this.points = points;
        this.isOpenPath = isOpenPath;
        this._updateCenter();
    }

    static fromMatrix(matrix: Array<Array<number>>): Polygon {
        const points = matrix.map(point => new Point(point[0], point[1]));
        return new Polygon(points);
    }

    static fromMatrixOpenPath(matrix: Array<Array<number>>): Polygon {
        var polygon = this.fromMatrix(matrix);
        polygon.isOpenPath = true;
        return polygon;
    }
        
    rotate(angle: AngleDirection): void {
        this.points = this.points.map(p => {
            const combinedVector = Vector.fromPoint(p);
            combinedVector.rotate(angle);

            return new Point(combinedVector.endPoint.x, combinedVector.endPoint.y)
        });
    }

    getWidth() {
        let min = 999999;
        let max = 0;

        this.points.forEach(p => {
            if (p.x < min) {
                min = p.x
            }

            if (p.x > max) {
                max = p.x
            } 
        });

        return max - min
    }

    _updateCenter() {
        const x = _.sumBy(this.points, p => p.x) / this.points.length;
        const y = _.sumBy(this.points, p => p.y) / this.points.length;

        this.center = new Point(x, y);
    }
}