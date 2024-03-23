import Velocity from "./velocity";
import Point from "./point";
import GameState from "./game-state";
import GameStateFactory from "./game-state-factory";
import Collider from "./collider";

export default abstract class GameObject {
    // the position in the previous frame
    previousPosition: Point;
    position: Point;
    width: number;
    height: number;
    velocity: Velocity;
    gameState: GameState;
    removeOnNextTick: boolean;
    collider: Collider;

    protected constructor(position: Point, width: number, height: number, magnitude: Velocity) {
        this.previousPosition = position;
        this.position = position;
        this.width = width;
        this.height = height;
        this.velocity = magnitude;
        this.gameState = GameStateFactory.getSingle();
    }

    get left() {
        return this.position.x - this.width / 2;
    }

    get right() {
        return this.position.x + this.width / 2;
    }

    get top() {
        return this.position.y - this.height / 2;
    }

    get bottom() {
        return this.position.y + this.height / 2;
    }

    updatePosition(secondsPassed: number) {
        this.previousPosition = this.position.clone();

        const movementX = this.velocity.xSpeed * secondsPassed;
        const movementY = this.velocity.ySpeed * secondsPassed;

        this.position.x += movementX;
        this.position.y += movementY;
        this._ensureOnScreen(this.position);

        if (this.collider != null) {
            this.collider.position.x += movementX;
            this.collider.position.y += movementY;
            this._ensureOnScreen(this.collider.position);
        }
    }

    updatePositionTogetherWith(secondsPassed: number, ... gameObjects: GameObject[]) {
        // Update positions of all objects before ensuring they're on the screen and potentially moving them
        // to the other side of the screen.
        // Otherwise, a rotation could cause an incorrect calculation due to adding the aroundpoint of an already-round-screened
        // object
        
        this.previousPosition = this.position.clone();

        const movementX = this.velocity.xSpeed * secondsPassed;
        const movementY = this.velocity.ySpeed * secondsPassed;

        this.position.x += movementX;
        this.position.y += movementY;

        if (this.collider != null) {
            this.collider.position.x += movementX;
            this.collider.position.y += movementY;
        }
        
        gameObjects.forEach(object => {
            object.previousPosition = object.position.clone();

            const movementX = object.velocity.xSpeed * secondsPassed;
            const movementY = object.velocity.ySpeed * secondsPassed;
    
            object.position.x += movementX;
            object.position.y += movementY;

            if (object.collider != null) {
                object.collider.position.x += movementX;
                object.collider.position.y += movementY;
            }    
        })

        this._ensureOnScreenIncludeAttached(this.position, ...gameObjects);
        this._ensureOnScreenIncludeAttached(this.collider.position);    
    }

    _ensureOnScreen(position: Point) {
        // travel to other side of screen if necessary

        if (position.x >= this.gameState.gameWidth) {
            position.x -= this.gameState.gameWidth;
        }

        if (position.x <= 0) {
            position.x += this.gameState.gameWidth;
        }

        if (position.y >= this.gameState.gameHeight) {
            position.y -= this.gameState.gameHeight;
        }

        if (position.y <= 0) {
            position.y += this.gameState.gameHeight;
        }
    }

    _ensureOnScreenIncludeAttached(position: Point, ... attachedGameObjects: GameObject[]) {
        // travel to other side of screen if necessary

        if (position.x >= this.gameState.gameWidth) {
            position.x -= this.gameState.gameWidth;

            attachedGameObjects.forEach(object => {
                object.position.x -= this.gameState.gameWidth;
            });
        }

        if (position.x <= 0) {
            position.x += this.gameState.gameWidth;

            attachedGameObjects.forEach(object => {
                object.position.x += this.gameState.gameWidth;
            });
        }

        if (position.y >= this.gameState.gameHeight) {
            position.y -= this.gameState.gameHeight;

            attachedGameObjects.forEach(object => {
                object.position.y -= this.gameState.gameHeight;
            });
        }

        if (position.y <= 0) {
            position.y += this.gameState.gameHeight;

            attachedGameObjects.forEach(object => {
                object.position.y += this.gameState.gameHeight;
            });
        }
    }
}