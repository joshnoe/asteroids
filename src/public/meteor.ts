import GameObject from './game-object';
import Velocity from "./velocity";
import Point from './point';

export default class Meteor extends GameObject {
    constructor(position: Point, magnitude: Velocity) {
        super(position, magnitude);
    }

}