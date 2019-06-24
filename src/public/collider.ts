import Collidable from "./collidable";
import Dimensions from "./dimensions";
import Point from "./point";
import GameObject from "./game-object";

export default class Collider {
    dimensions: Dimensions;
    position: Point;

    constructor(dimensions: Dimensions, position: Point) {
        this.dimensions = dimensions;
        this.position = position;
    }

    get left() {
        return this.position.x - this.dimensions.width / 2;
    }

    get right() {
        return this.position.x + this.dimensions.width / 2;
    }

    get top() {
        return this.position.y - this.dimensions.height / 2;
    }

    get bottom() {
        return this.position.y + this.dimensions.height / 2;
    }

    collidedWith(other: Collidable): boolean {
        const otherLeft = other.collider.left;
        const otherRight = other.collider.right;
        const otherTop = other.collider.top;
        const otherBottom = other.collider.bottom;

        const isSamePlaneVertically = (this.left >= otherLeft && this.left <= otherRight)
            || (this.right <= otherRight && this.right >= otherLeft)
            || (this.left >= otherLeft && this.right <= otherRight)
            || (otherRight <= this.right && otherLeft >= this.left)

        if (!isSamePlaneVertically) {
            return false;
        }

        const isSamePlaneHorizontally = (this.top >= otherTop && this.top <= otherBottom)
            || (this.bottom <= otherBottom && this.bottom >= otherTop)
            || (this.top >= otherTop && this.bottom <= otherBottom)
            || (otherBottom <= this.bottom && otherTop >= this.top)

        return isSamePlaneHorizontally;

        // const thisTravelSegement = new Segment(this.previousPosition, this.position);
        // const otherTravelSegment = new Segment(other.previousPosition, other.position);
        //
        // return thisTravelSegement.intersects(otherTravelSegment);
    }

    // wouldCollideWith(other: GameObject, seconds: number) {
    //     const testRate = .05;
    //     let secondsPassed = 0;
    //
    //     const thisCopy = _.cloneDeep(this);
    //
    //     while(secondsPassed <= seconds) {
    //         // create copy of object, moved from position of original
    //         thisCopy.updatePosition(secondsPassed);
    //
    //         if (thisCopy.collidedWith(other)) {
    //             return true;
    //         }
    //
    //         secondsPassed += testRate;
    //     }
    //
    //     return false;
    // }
}