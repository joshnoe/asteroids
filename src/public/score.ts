import Polygon from "./polygon";
import PolygonGameObject from "./polygon-game-object";
import GameState from "./game-state";
import GameStateFactory from "./game-state-factory";
import Point from "./point";
import Velocity from "./velocity";
import AngleDirection from "./angle-direction";

const digitWidth = 20
const digitHeight = 50
const digitMargin = 2
const distanceFromRightOfScreen = 20
const distanceFromTopOfScreen = 20

export default class Score {
    total : number
    gamestate: GameState
    
    private digitPolygons : Array<Polygon>

    constructor() {
        this.gamestate = GameStateFactory.getSingle()
        
        const halfWidth = digitWidth / 2;

        this.digitPolygons = [
            Polygon.fromMatrix([[halfWidth, 0], [halfWidth, digitHeight]])
        ]
    }

    public addAsteroidKill() {
        this.total += 10
    }

    public *totalPolygon() : Generator<PolygonGameObject> {
        const totalString = this.total.toString()
        for (var i = 0; i < totalString.length; i++) {
            const digit = parseInt(totalString[i])
            const offset = (totalString.length - 1) - i

            const positionX = this.gamestate.gameWidth - (offset * (digitWidth + digitMargin)) - distanceFromRightOfScreen
            yield new PolygonGameObject(new Point(positionX, distanceFromTopOfScreen),
                                         digitWidth, 
                                         digitHeight, 
                                         new Velocity(0, new AngleDirection(0)), 
                                         this.digitPolygons[digit])
        }
    }
}