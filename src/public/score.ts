import Polygon from "./polygon"
import GameState from "./game-state";

const digitWidth = 20;
const digitHeight = 50;
const rightOfScreenPadding = this.gameState

export default class Score {
    total : number
    
    private digitPolygons : Array<Polygon>

    constructor() {
        this.digitPolygons = [
            new Polygon(0, 0)
        ]
    }

    public addAsteroidKill() {
        this.total += 10
    }

    public *totalPolygon() : Array<Polygon> {
        const totalString = this.total.toString();
        for (var i = 0; i < totalString.length; i++) {
            const digit = totalString[i];
            yield digitPolygons[digit];
        }
    }

    private positionTopRightOfScreen(polygon : Polygon) {
        

        for (const point in polygon.points) {
            point = 
        }
    }
}