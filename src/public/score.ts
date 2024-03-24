import Polygon from "./polygon";
import GameState from "./game-state";
import GameStateFactory from "./game-state-factory";
import Point from "./point";
import Glpyh from "./glyph";
import Segment from "./segment";
import PositionalGlyph from "./positional-glyph";

const digitWidth = 20
const digitHeight = 50
const digitMargin = 10
const distanceFromRightOfScreen = 50
const distanceFromTopOfScreen = 20

export default class Score {
    total : number
    gamestate: GameState
    
    private digitGlyphs : Array<Glpyh>

    constructor() {
        this.total = 0;
        this.gamestate = GameStateFactory.getSingle()
        
        const width = digitWidth;
        const height = digitHeight;

        const halfWidth = width / 2;
        const halfHeight = height / 2;

        this.digitGlyphs = [
            // 0
            new Glpyh(Polygon.fromMatrixOpenPath([[0, 0], [width, 0], [width, height], [0, height], [0, 0]])),
            
            // 1
            new Glpyh(Polygon.fromMatrixOpenPath([[halfWidth, 0], [halfWidth, height]])),
            
            // 2
            new Glpyh(Polygon.fromMatrixOpenPath([[0, 0], [width, 0], [width, halfHeight], [0, halfHeight], [0, height], [width, height]])),
            
            // 3
            new Glpyh(Polygon.fromMatrixOpenPath([[0, 0], [width, 0], [width, height], [0, height]]),
                      [Segment.fromPoints(0, halfHeight, width, halfHeight)]),            
            
            // 4
            new Glpyh(Polygon.fromMatrixOpenPath([[0, 0], [0, halfHeight], [width, halfHeight], [width, 0]]),
                        [Segment.fromPoints(width, halfHeight, width, height)]),

            // 5
            new Glpyh(Polygon.fromMatrixOpenPath([[width, 0], [0, 0], [0, halfHeight], [width, halfHeight], [width, height], [0, height]])),
            
            // 6
            new Glpyh(Polygon.fromMatrixOpenPath([[width, 0], [0, 0], [0, halfHeight], [width, halfHeight], [width, height], [0, height], [0, halfHeight]])),
            
            // 7
            
            new Glpyh(Polygon.fromMatrixOpenPath([[0, 0], [width, 0], [width, height]])),
            
            // 8
            new Glpyh(Polygon.fromMatrixOpenPath([[0, 0], [width, 0], [width, height], [0, height], [0, 0]]),
                        [Segment.fromPoints(0, halfHeight, width, halfHeight)]),
            // 9
            new Glpyh(Polygon.fromMatrixOpenPath([[width, halfHeight], [0, halfHeight], [0, 0], [width, 0], [width, height], [0, height]]))
        ]
    }

    public addAsteroidKill() {
        this.total += 10
    }

    public totalAsGlyphs() : PositionalGlyph[] {
        const totalString = this.total.toString()
        
        return totalString.split('').map((currentString, i) => {
            const digit = parseInt(currentString);
            const offset = (totalString.length - 1) - i;

            const positionX = this.gamestate.gameWidth - (offset * (digitWidth + digitMargin)) - distanceFromRightOfScreen;
            
            return new PositionalGlyph(this.digitGlyphs[digit], new Point(positionX, distanceFromTopOfScreen));
        });
    }
}