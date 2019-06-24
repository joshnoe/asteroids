import Point from './point';
import Velocity from "./velocity";
import Polygon from "./polygon";
import PolygonGameObject from "./polygon-game-object";
import Collidable from "./collidable";
import Collider from "./collider";
import Dimensions from "./dimensions";

export default class Asteroid extends PolygonGameObject implements Collidable {
    stage: number;
    collider: Collider;

    constructor(position: Point, dimensions: Dimensions, velocity: Velocity, shape: Polygon, stage: number) {
        super(position, dimensions.width, dimensions.height, velocity, shape);

        this.stage = stage;
        this.collider = new Collider(dimensions.clone(), position.clone());
    }
}