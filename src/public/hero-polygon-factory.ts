import Point from "./point";
import Polygon from "./polygon";

export default class HeroPolygonFactory {
    static readonly heroWidth = 14;
    static readonly heroHeight = 20;
    
    createShape() : Polygon {
        const halfHeroWidth = HeroPolygonFactory.heroWidth / 2;
        const halfHeroHeight = HeroPolygonFactory.heroHeight / 2;
        const heroCoordinates : Array<Point> = [new Point(0, -(halfHeroHeight)), new Point(halfHeroWidth, halfHeroHeight), new Point(-(halfHeroWidth), halfHeroHeight)];
        return new Polygon(heroCoordinates);
    } 
}