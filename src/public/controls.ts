import Point from "./point";
import AngleDirection from "./angle-direction";
import KeyboardDirection from "./keyboard-direction";
import AsteroidsControls from "./asteroids-controls";
import Ship from "./ship";

enum movementTypes {
    asteroids,
    smashTV,
    mouse
}

export default class Controls {
    movementCommand: string;
    mousePosition: Point;
    keyboardDirection: KeyboardDirection;
    movementType: movementTypes;
    asteroidsControls: AsteroidsControls;

    constructor() {
        this.movementCommand = null;
        this.mousePosition = null;
        this.keyboardDirection = new KeyboardDirection();
        this.asteroidsControls = new AsteroidsControls();

        // change to mouse for mouse movement
        this.movementType = movementTypes.smashTV;
    }

    bind() {
        if (this.movementType == movementTypes.smashTV) {
            window.addEventListener('keydown', e => this._handleKeyDown(e));
            window.addEventListener('keyup', e => this._handleKeyUp(e));
        }
        else {
            window.addEventListener("mousemove", e => this._handleMouseMove(e));
        }
    }

    _handleKeyDown(event: KeyboardEvent): void {
        this._setKeyboardDirection(event.key, true);
    }

    _handleKeyUp(event: KeyboardEvent): void {
        this._setKeyboardDirection(event.key, false);
    }

    _setKeyboardDirection(key: string, isPressed: boolean) {
        switch (key) {
            case "ArrowLeft":
                this.keyboardDirection.left = isPressed;
                break;
            case "ArrowRight":
                this.keyboardDirection.right = isPressed;
                break;
            case "ArrowUp":
                this.keyboardDirection.up = isPressed;
                break;
            case "ArrowDown":
                this.keyboardDirection.down = isPressed;
                break;
        }
    }

    _handleMouseMove(event: MouseEvent) {
        this.mousePosition = new Point(event.clientX, event.clientY);
    }

    turn(hero: Ship): void {
        // no-op
    }

    getThrustDirection(shipPosition: Point) {
        if (this.movementType == movementTypes.smashTV) {
            return this.keyboardDirection.getOverallDirection();
        }

        else if (this.movementType == movementTypes.mouse) {
            // get angle
            let xDist = this.mousePosition.x - shipPosition.x;
            let yDist = this.mousePosition.y - shipPosition.y;

            return AngleDirection.fromXY(xDist, yDist);
        }

        else throw new Error('Not implemented this movementType');
    }
}