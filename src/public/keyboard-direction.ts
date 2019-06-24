import Vector from "./vector";
import AngleDirection from "./angle-direction";

export default class KeyboardDirection {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;

    getOverallDirection() {
        // create vectors from all down keys
        const keyboardVectors : Array<Vector> = [];

        if (this.up) {
            keyboardVectors.push(new Vector(1, AngleDirection.fromDegrees(270)));
        }

        if (this.right) {
            keyboardVectors.push(new Vector(1,AngleDirection.fromDegrees(0)));
        }

        if (this.down) {
            keyboardVectors.push(new Vector(1,AngleDirection.fromDegrees(90)));
        }

        if (this.left) {
            keyboardVectors.push(new Vector(1,AngleDirection.fromDegrees(180)));
        }

        if (keyboardVectors.length == 0) {
            return null;
        }

        const sum = keyboardVectors.reduce((accumulator, currentVal) => accumulator.add(currentVal));
        return sum.direction;
    }
}