import Glpyh from "./glyph";
import Point from "./point";
import Polygon from "./polygon";
import Segment from "./segment";

export default class PositionalGlyph extends Glpyh {
    position : Point;

    constructor(glyph: Glpyh, position: Point) {
        super(glyph.polygon, glyph.freeSegments);
        this.position = position;
    }
}