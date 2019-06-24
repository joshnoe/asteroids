import Asteroid from "./asteroid";
import Explosion from "./explosion";
import PointGameObject from "./point-game-object";
import AngleDirection from "./angle-direction";
import Velocity from "./velocity";
import Ship from "./ship";
import GameObject from "./game-object";

const pointsPerAsteroidExplosion = 20;
const asteroidExplosionMaxSpeed = 60;

export default class ExplosionFactory {

    createFromAsteroid(asteroid: Asteroid): Explosion {
        return this._createFromObject(asteroid, 20, 60, 1);
    }

    createFromShip(ship: Ship) {
        return this._createFromObject(ship, 500, 120, 2);
    }

    _createFromObject(object: GameObject, pointsCount: number, maxSpeed: number, lifetime: number) {
        let points: Array<PointGameObject> = [];

        for(let i = 0; i < pointsCount; i++) {
            // create explosion point
            const angle = AngleDirection.createRandom();
            const speed = Math.random() * maxSpeed;

            points.push(new PointGameObject(object.position.clone(), new Velocity(speed, angle)));
        }

        return new Explosion(object.position, points, lifetime);
    }

}