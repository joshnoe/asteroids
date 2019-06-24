export default class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y);
    }

    subtract(point: Point) {
        return new Point(this.x - point.x, this.y - point.y);
    }

    clone() : Point {
        return new Point(this.x, this.y);
    }
}