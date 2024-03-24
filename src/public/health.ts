import PolygonGameObject from "./polygon-game-object";
import Point from "./point";
import Velocity from "./velocity";
import AngleDirection from "./angle-direction";
import HeroPolygonFactory from "./hero-polygon-factory";

const distanceFromLeftOfScreen = 50
const distanceFromTopOfScreen = 20
const spaceBetweenShips = 10

export default class Health {
    livesLeft: number
    livesLeftPolygons: PolygonGameObject[]
    herofactory: HeroPolygonFactory
    
    constructor(livesLeft: number) {
        this.livesLeft = livesLeft
        this.livesLeftPolygons = []
        this.herofactory = new HeroPolygonFactory()

        this._refreshLivesLeftPolygons()
    }

    decreaseLife() {
        this.livesLeft --
        this._refreshLivesLeftPolygons()
    }

    _refreshLivesLeftPolygons() {
        for(let i = 0; i < this.livesLeft; i++) {
            const heroShape = this.herofactory.createShape()
            const width = heroShape.getWidth()
            const x = distanceFromLeftOfScreen + (i * (width + spaceBetweenShips))
            const position = new Point(x, distanceFromTopOfScreen)
            const gameObj = new PolygonGameObject(position, width, 10, new Velocity(0, new AngleDirection(0)), heroShape)
            this.livesLeftPolygons.push(gameObj)
        }
    }
}