import GameState from "./game-state";
import GameStateFactory from "./game-state-factory";
import Asteroid from "./asteroid";
import Point from "./point";
import Velocity from "./velocity";
import AngleDirection from "./angle-direction";
import Polygon from "./polygon";
import AsteroidStage from "./asteroid-stage";
import Vector from "./vector";
import Dimensions from "./dimensions";

export default class AsteroidFactory {
    _gameState: GameState;
    _stages: Map<number, number>;

    constructor() {
        this._gameState = GameStateFactory.getSingle();
        this._defineStages();
    }

    createAtBorder() {
        // pick position on border
        // 1 = left. 2 = top, 3 = right, 4 = bottom
        const border = Math.ceil(Math.random() * 4);
        let yPosition;
        let xPosition;

        // left border
        if (border == 1) {
            xPosition = 0;
            yPosition = Math.random() * this._gameState.gameHeight;
        }

        // top border
        if (border == 2) {
            xPosition = Math.random() * this._gameState.gameWidth;
            yPosition = 0;
        }

        // right border
        if (border == 3) {
            xPosition = this._gameState.gameWidth;
            yPosition = Math.random() * this._gameState.gameHeight;
        }

        // bottom border
        if (border == 4) {
            xPosition = Math.random() * this._gameState.gameWidth;
            yPosition = this._gameState.gameHeight;
        }

        return this._createAtPosition(new Point(xPosition, yPosition));
    }

    createTwoFromShot(asteroid: Asteroid): Array<Asteroid> {
        // split into two asteroids
        return [
            this._createFromShot(asteroid),
            this._createFromShot(asteroid),
        ];
    }

    _createAtPosition(position: Point) {
        const speed = Math.random() * this._gameState.maxAsteroidSpeed;
        const stage = Math.ceil(Math.random() * this._stages.size);
        const radius = this._stages.get(stage);

        const polygonPoints = this._generatePolygonPoints(radius);
        const polygon = new Polygon(Array.from(polygonPoints));

        const dimensions = new Dimensions(radius * 2, radius * 2);

        // TODO: AngleDirection.createRandom should ensure asteroids start moving inward? Once you can pass through the screen this won't matter though
        return new Asteroid(position, dimensions, new Velocity(speed, AngleDirection.createRandom()), polygon, stage)
    }

    _createFromShot(asteroid: Asteroid) {
        // pick stage
        const newStage = asteroid.stage - 1;
        const radius = this._stages.get(newStage);

        const polygonPoints = this._generatePolygonPoints(radius);
        const polygon = new Polygon(Array.from(polygonPoints));

        const direction = AngleDirection.createRandomInRange(asteroid.velocity.direction, .5 * Math.PI);
        const dimensions = new Dimensions(radius * 2, radius * 2);

        // TODO: AngleDirection.createRandom should ensure asteroids start moving inward? Once you can pass through the screen this won't matter though
        return new Asteroid(asteroid.position.clone(), dimensions, new Velocity(asteroid.velocity.speed, direction), polygon, newStage);
    }

    _defineStages(): void {
        this._stages = new Map([
            [4, 30],
            [3, 15],
            [2, 8],
            [1, 4]
        ]);

        // this._stages = [
        //     new AsteroidStage(4, 30),
        //     new AsteroidStage(3, 15),
        //     new AsteroidStage(2, 8),
        //     new AsteroidStage(1, 4)
        // ];
    }

    *_generatePolygonPoints(radius: number) : IterableIterator<Point> {
        const fullRotation = Math.PI * 2;
        const quarterRotation = Math.PI * .5;

        const startingAngle = Math.random() * fullRotation;

        let currentAngle: number = startingAngle;

        // while a full circle hasn't yet been completed
        while(currentAngle < startingAngle + fullRotation) {
            const currentVector = new Vector(radius, new AngleDirection(currentAngle));
            yield currentVector.endPoint;

            currentAngle = currentAngle + Math.random() * quarterRotation;
        }
    }
}