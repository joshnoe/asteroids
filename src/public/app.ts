// TODO: remove height and width from gameObject
// TODO: make asteroid explosion larger if asteroid is larger

import Asteroid from "./asteroid";
import GameState from "./game-state";
import GameStateFactory from "./game-state-factory";
import AsteroidFactory from "./asteroid-factory";
import AsteroidsControls from "./asteroids-controls";
import ExplosionFactory from "./explosion-factory";
import Explosion from "./explosion";
import PolygonGameObject from "./polygon-game-object";
import PointGameObject from "./point-game-object";
import AudioPlayer from "./audio-player";
import HeroFactory from "./hero-factory";
import Hero from "./hero";
import UFO from "./ufo";
import Point from "./point";
import Velocity from "./velocity";
import AngleDirection from "./angle-direction";
import Score from "./score";
import PositionalGlyph from "./positional-glyph";
import Segment from "./segment";
import { time, timeStamp } from "console";

const maxAsteroids = 10;
const chanceOfNewAsteroidPerSecond = .3;

class App {
    canvas1: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    hero: Hero;
    asteroids: Array<Asteroid> = [];
    ufos: Array<UFO> = [];
    explosions: Array<Explosion> = [];
    controls: AsteroidsControls;
    gameState: GameState;
    audioPlayer: AudioPlayer;
    asteroidFactory: AsteroidFactory;
    explosionFactory: ExplosionFactory;
    heroFactory: HeroFactory;
    lastLoopTick: number | null;
    score: Score;

    constructor() {
        this.lastLoopTick = null;
        this.canvas1 = <HTMLCanvasElement> document.getElementById("main-canvas");
        this.ctx = <CanvasRenderingContext2D> this.canvas1.getContext("2d");
        GameStateFactory.set(this.canvas1.width, this.canvas1.height);
        this.gameState = GameStateFactory.getSingle();
        this.score = new Score();
        this.asteroidFactory = new AsteroidFactory();
        this.explosionFactory = new ExplosionFactory();

        this.controls = new AsteroidsControls();
        this.audioPlayer = new AudioPlayer();
        this.heroFactory = new HeroFactory(this.audioPlayer, this.gameState);

        this.audioPlayer.loadSamples().then(() => {
            this.hero = this.heroFactory.createSafeFromCollisions([]);

            this.controls.bind();
            window.requestAnimationFrame(timeStamp => this._executeGameStep(timeStamp));
        });
    }

    _executeGameStep(timeStamp: number): void {
        if (!this.controls.pause) {

            if (this.lastLoopTick == null) {
                this.lastLoopTick = timeStamp;
            }

            let millisecondsPassed: number = timeStamp - this.lastLoopTick;
            let secondsPassed = millisecondsPassed / 1000;
            this._generateNewGameObjects(secondsPassed);
            this._updatePositions(secondsPassed);
            this._detectCollisions(timeStamp);
            this._render();

            this.gameState.totalGameTime += secondsPassed;
        }

        window.requestAnimationFrame(timeStamp => this._executeGameStep(timeStamp));
        this.lastLoopTick = timeStamp;
    }

    _generateNewGameObjects(secondsPassed: number) {
        // generate ufo
        // if (this.ufos.length == 0) {
        //     const ufoPolygon = new Polygon([new Point(0, 0), new Point(20, 0), new Point(20, 20), new Point(0, 20)]);
        //     this.ufos.push(new UFO(new Point(0, 50), 20, 20, new Velocity(50, new AngleDirection(0)), 50, ufoPolygon));
        // }

        //generate asteroids
        if (this.asteroids.length < maxAsteroids) {
            // possibly generate new asteroid
            const asteroidChance = chanceOfNewAsteroidPerSecond * secondsPassed;
            const doCreateNew = asteroidChance > Math.random();
        
            if (doCreateNew) {
                this.asteroids.push(this.asteroidFactory.createAtBorder());
            }
        }

        // generate ufo bullets

    }

    _updatePositions(secondsPassed: number): void {
        if (secondsPassed == 0) {
            return;
        }

        this.hero.applyControls(this.controls, secondsPassed);

        // Could be used for "slow-motion" abilities

        this.hero.updatePosition(secondsPassed);

        this.asteroids.forEach(a => {
            a.updatePosition(secondsPassed);
        });

        // this.ufos.forEach(ufo => {
        //     ufo.updatePosition(secondsPassed);
        //     const shouldShoot = Math.floor(this.gameState.totalGameTime) % 5 === 0;
        //     if (shouldShoot) {
        //         //ufo.shoot(this.hero);
        //     }
            
        // });

        this.explosions.forEach((e, index) => {
            if (e.removeOnNextTick) {
                delete this.explosions[index];
            }
            else {
                e.updatePosition(secondsPassed);
            }
        });

        this.gameState.bullets.forEach((b, index) => {
            if (b.removeOnNextTick) {
                delete this.gameState.bullets[index];
            }
            else {
                b.updatePosition(secondsPassed);
            }
        });

        this.gameState.enemyBullets.forEach((b, index) => {
            if (b.removeOnNextTick) {
                delete this.gameState.bullets[index];
            }
            else {
                b.updatePosition(secondsPassed);
            }
        });
    }

    _detectCollisions(timeStamp: number): void {
        this.ctx.save();

        // detect if hero has run into any objects
        this.asteroids.forEach((a, asteroidIndex) => {
            // detect if bullets hit any asteroids
            this.gameState.bullets.forEach((b, bulletIndex) => {
                if (a.collider.collidedWith(b)) {
                    if (a.stage > 1) {
                        this.asteroids.push(...this.asteroidFactory.createTwoFromShot(a));
                    }

                    this.explosions.push(this.explosionFactory.createFromAsteroid(a));
                    delete this.asteroids[asteroidIndex];
                    delete this.gameState.bullets[bulletIndex];
                    this.audioPlayer.playExplosionSmall();
                    this.score.addAsteroidKill();
                }
            });

            if (timeStamp - this.hero.lastTimeKilled > 3000) {
                this._reviveHero();
            }

            if (this.hero.isAlive && this.hero.collider.collidedWith(a)) {
                this._killHero(timeStamp);
            }
        });
    }

    _killHero(timeStamp: number): void {
        this.hero.isAlive = false;
        this.explosions.push(this.explosionFactory.createFromShip(this.hero));
        this.audioPlayer.playExplosionLarge();
        this.hero.lastTimeKilled = timeStamp
    }

    _reviveHero() : void {
        this.hero = this.heroFactory.createSafeFromCollisions([]);
    }

    _render(): void {
        this.ctx.clearRect(0, 0, this.canvas1.width, this.canvas1.height);

        // background
        this.ctx.save();
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas1.width, this.canvas1.height);
        this.ctx.restore();

        if (this.hero.isAlive) {
            this.ctx.save();
            // this.ctx.strokeStyle = "#45f442";
            this.ctx.strokeStyle = "white";
            this.ctx.lineWidth = 1;
            this._renderPolygonObject(this.hero);

            if (this.hero.isThrusting) {
                this._renderPolygonObject(this.hero.thrustTail);
            }
            // if (this.hero.isThrusting) {
            //
            // }

            this.ctx.restore();

            // for debugging ship position
            // this.ctx.fillStyle = "green";
            // this.ctx.fillRect(this.hero.position.x - 1, this.hero.position.y - 1, 2, 2);
            //
            // this.ctx.fillStyle = "red";
            // this.ctx.fillRect(this.hero.thrustTail.position.x - 1, this.hero.thrustTail.position.y - 1, 2, 2);

            // this.ctx.strokeStyle = "green";
            // this.ctx.strokeRect(this.hero.left, this.hero.top, this.hero.width, this.hero.height);
            // this.ctx.strokeRect(this.hero.position.x, this.hero.position.y, 1, 1);
        }

        this.ctx.save();
        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 1;

        this.gameState.bullets.forEach(b => {
            this._renderPointObject(b);
        });

        this.gameState.enemyBullets.forEach(b => {
            this._renderPointObject(b);
        });

        this.asteroids.forEach(a => {
            this._renderPolygonObject(a);
        });

        this.ufos.forEach(ufo => {
            this._renderPolygonObject(ufo);
        });

        this.explosions.forEach(e => {
            e.points.forEach(p => this._renderPointObject(p));
        });

        this.score.totalAsGlyphs().forEach(g => {
            this._renderGlyph(g);
        });

        this.ctx.restore();
    }

    _renderPolygonObject(object: PolygonGameObject) {
        const points = object.shape.points;

        this.ctx.beginPath();
        this.ctx.moveTo(object.getShapePointPositionX(0), object.getShapePointPositionY(0));

        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(object.getShapePointPositionX(i), object.getShapePointPositionY(i));
        }

        if (!object.shape.isOpenPath) {
            this.ctx.closePath();
        }

        this.ctx.stroke();
    }

    _renderSegment(segment: Segment, position: Point) {
        this.ctx.beginPath();

        const positionedSegment = segment.positionAt(position);
        
        this.ctx.moveTo(positionedSegment.pointA.x, positionedSegment.pointA.y);
        this.ctx.lineTo(positionedSegment.pointB.x, positionedSegment.pointB.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    _renderPointObject(object: PointGameObject) {
        this.ctx.fillRect(object.position.x, object.position.y, 1, 1);
    }

    _renderGlyph(glyph: PositionalGlyph) {
        const polygonGameObject = new PolygonGameObject(glyph.position, 0, 0, new Velocity(0, new AngleDirection(0)), glyph.polygon);
        this._renderPolygonObject(polygonGameObject);
        if (glyph.freeSegments !== null) {
            glyph.freeSegments.forEach(segment => this._renderSegment(segment, glyph.position));
        }
    }
}

new App();
