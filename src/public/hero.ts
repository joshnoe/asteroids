import Ship from "./ship";
import Point from "./point";
import Velocity from "./velocity";
import AudioPlayer from "./audio-player";
import Polygon from "./polygon";
import AsteroidsControls from "./asteroids-controls";
import AngleDirection from "./angle-direction";
import Force from "./force";
import Bullet from "./bullet";
import PolygonGameObject from "./polygon-game-object";
import Collidable from "./collidable";
import Collider from "./collider";
import Dimensions from "./dimensions";

export default class Hero extends Ship implements Collidable {
    isThrusting: boolean = false;
    thrustTail: PolygonGameObject;
    collider: Collider;

    constructor(audioPlayer: AudioPlayer, position: Point, dimensions: Dimensions, velocity: Velocity, weight: number, thrustPower: number, turnRate: number, shotRate: number, shape: Polygon) {
        super(audioPlayer, position, dimensions.width, dimensions.height, velocity, weight, thrustPower, turnRate, shotRate, shape);

        this.collider = new Collider(dimensions.clone(), position.clone());

        this.facingDirection = new AngleDirection(-0.5 * Math.PI);

        const tailHeight = this.height * .2;
        const tailWidth = this.width * .8;
        const tailPosition = new Point(this.position.x, this.bottom + tailHeight / 2);
        const tailShape = Polygon.fromMatrix([[tailWidth / 2, -(tailHeight / 2)], [0, tailHeight / 2], [-(tailWidth / 2), -(tailHeight /2)]]);

        this.thrustTail = new PolygonGameObject(tailPosition, tailWidth, tailHeight, this.velocity.clone(), tailShape);
        this.thrustTail.facingDirection = this.facingDirection.clone();
    }

    updatePosition(secondsPassed: number) {
        super.updatePosition(secondsPassed);
        this.thrustTail.updatePosition(secondsPassed);
    }

    applyControls(controls: AsteroidsControls, secondsPassed: number): void {
        // turn
        let turnRatio : number;

        if (controls.keyboardDirection.left) {
            turnRatio = -(this.turnRate * secondsPassed);
        }

        if (controls.keyboardDirection.right) {
            turnRatio = this.turnRate * secondsPassed;
        }

        if (turnRatio != null) {
            const direction = AngleDirection.fromRatio(turnRatio);
            this._rotate(this.position, direction);
            this.thrustTail._rotate(this.position, direction);
        }

        // thrust
        let thrustForce: Force;

        if (controls.keyboardDirection.up) {
            thrustForce = new Force(this.facingDirection, this.thrustPower);
        }

        // uncomment to allow braking
        // if (controls.keyboardDirection.down) {
        //     thrustForce = new Force(this.facingDirection.opposite(), this.thrustPower);
        // }

        // apply thrust force vector
        if (thrustForce != null) {
            this.applyForce(thrustForce, this.weight);
            this.thrustTail.applyForce(thrustForce, this.weight);
            this.isThrusting = true;
            this._audioPlayer.playRocketContinuous();
        }
        else {
            this.isThrusting = false;
            this._audioPlayer.stopRocketContinuous();
        }

        //shoot
        this._secondsSinceLastShot+= secondsPassed;
        if (controls.tryShoot && this._secondsSinceLastShot >= this.shotRate) {
            // bullet position is first point of ship, which is the nose

            const bullet = new Bullet(this.position.add(this.shape.points[0]), new Velocity(300, this.facingDirection.clone()));
            this.gameState.bullets.push(bullet);
            this._audioPlayer.playShot();
            this._secondsSinceLastShot = 0;
            controls.tryShoot = false;
        }
    }
}