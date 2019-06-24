export default class Energy {
    speed: number;
    weight: number;

    constructor(speed: number, weight: number) {
        this.speed = speed;
        this.weight = weight;
    }

    get energy(): number {
        return this.speed * this.weight;
    }
}