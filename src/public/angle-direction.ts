const pi = 3.14159265359;
const twoPi = pi * 2;

export default class AngleDirection {
    angle: number;

    constructor(direction: number) {
        this.angle = direction;
    }

    add(direction: AngleDirection) {
        this.angle += direction.angle;
    }

    subtract(direction: AngleDirection) {
        this.angle -= direction.angle;
    }

    clone(): AngleDirection {
        return new AngleDirection(this.angle);
    }

    opposite() {
        return new AngleDirection(this.angle + pi)
    }

    static createRandom() {
        return new AngleDirection(Math.random() * twoPi);
    }

    static createRandomInRange(angle: AngleDirection, rangeAmount: number): AngleDirection {

        const min = angle.angle - (rangeAmount / 2);
        const max = angle.angle + (rangeAmount / 2);

        const newAngle = (Math.random() * (max - min)) + min;
        return new AngleDirection(newAngle);
    }

    static fromDegrees(degrees: number): AngleDirection {
        return new AngleDirection(degrees * 0.0174533);
    }

    static fromXY(x: number, y: number): AngleDirection {
        return new AngleDirection(Math.atan2(y, x));
    }

    static fromRatio(ratio: number): AngleDirection {
        return new AngleDirection(ratio * twoPi);
    }

}