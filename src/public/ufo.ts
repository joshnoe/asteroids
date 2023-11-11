import Character from "./character";
import Hero from "./hero";
import AngleDirection from "./angle-direction";
import Bullet from "./bullet";
import Point from "./point";
import Velocity from "./velocity";

export default class UFO extends Character {
    // shoot(hero: Hero): void {
    //     // find angle to shoot at
    //     let angle = this.getAngleToShootAt(hero);
    //     this.gameState.enemyBullets.push(new Bullet(this.position.clone(), new Velocity(20, angle)))
    // }

    // private getAngleToShootAt(hero: Hero): AngleDirection {
    //     // get amount to lead hero on x and y axises
    //     xLead = this.getVectorPointedAt(hero);

    //     return new AngleDirection(30);
    // }
}