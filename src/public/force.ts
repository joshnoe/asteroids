import Velocity from "./velocity";
import AngleDirection from "./angle-direction";
import Vector from "./vector";

export default class Force extends Vector{
    constructor(direction: AngleDirection, momentum: number) {
        super(momentum, direction);
    }

    get momentum(): number {
        return this.magnitude;
    }
}