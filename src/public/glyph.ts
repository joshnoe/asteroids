import Polygon from "./polygon";
import Segment from "./segment";
import Point from "./point";

export default class Glpyh {
    polygon: Polygon;
    freeSegments: Segment[] | null;

    // The polygon typically makes up most of the glyph, but there can be
    // free segments when the polygon can't draw the glyph without "lifting the pencil"
    constructor(polygon: Polygon, freeSegments: Segment[] | null = null) {
        this.polygon = polygon;
        this.freeSegments = freeSegments;
    }

    getPositionedSegment(index: number) : Segment {
        if (this.polygon.points.length - 1 >= index) {
            return new Segment(this.polygon.points[index], this.polygon.points[index + 1]);
        }

        if (this.freeSegments === null) {
            throw Error("Index out of range. Not found in polygon and freeSegments is null.")
        }

        return this.freeSegments[index - (this.polygon.points.length -1)];
    }
}