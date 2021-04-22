import { DrawableRectangle } from "../drawables/drawable-rectangle.js";
import { GameCollisionChecker } from "./game-collision-checker.js";

export class GameScreen {
    constructor() {
        this.gameObjects = [];
        this.game = null;
        this.backgroundDrawable = new DrawableRectangle(0, 0, 0, 0, 'white');
        this.collisionChecker = new GameCollisionChecker();
    }

    /**
     * Create is called when the GameScreen is used in the Game. You can override this
     * to set up the game screen.
     */
    create() {}

    getGameSize() {
        return {
            width: this.game.canvas.width,
            height: this.game.canvas.height
        };
    }

    setGame(game) {
        this.game = game;
        const { width, height } = this.getGameSize();
        this.backgroundDrawable.setSize(width, height);
    }

    setBackgroundColor(color) {
        this.backgroundDrawable.setColor(color);
    }

    addGameObject(gameObject) {
        gameObject.setGameScreen(this);
        this.gameObjects.push(gameObject);
        gameObject.create();
    }

    removeGameObject(gameObject) {
        const idx = this.gameObjects.indexOf(gameObject);
        if (idx >= 0) {
            gameObject.setGameScreen(null);
            this.gameObjects.splice(idx, 1);
            const colliders = gameObject.getColliders();
            colliders.forEach(collider => this.removeCollider(collider));
        }
    }

    update(secondsDifference) {
        this.gameObjects.forEach(gameObject => gameObject.update(secondsDifference));
        this.collisionChecker.findCollisions();
    }

    draw(secondsDifference, context2d) {
        this.backgroundDrawable.draw(secondsDifference, context2d);
        this.gameObjects.forEach(gameObject => gameObject.draw(secondsDifference, context2d));
    }

    addCollider(collider) {
        this.collisionChecker.addCollider(collider);
    }

    removeCollider(collider) {
        this.collisionChecker.removeCollider(collider);
    }
}