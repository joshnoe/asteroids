export default class AsteroidStage {
    // higher is larger asteroid
    stage: number;
    radius: number;

    constructor(stage: number, radius: number) {
        this.stage = stage;
        this.radius = radius;
    }
}