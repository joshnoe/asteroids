import Force from "./force";
import AngleDirection from "./angle-direction";
import Vector from "./vector";

export default class Velocity extends Vector {
    constructor(speed: number, direction: AngleDirection) {
        super(speed, direction);
    }

    get speed(): number {
        return this.magnitude;
    }

    get xSpeed() : number {
        return this.speed * Math.cos(this.direction.angle);
    }

    get ySpeed() : number {
        return this.speed * Math.sin(this.direction.angle);
    }

    getEnergy(weight: number) {
        return this.speed * weight;
    }

    getForce(weight: number): Force {
        let momentum = this.speed * weight;
        return new Force(this.direction, momentum);
    }

    clone(): Velocity {
        return new Velocity(this.speed, this.direction);
    }
}