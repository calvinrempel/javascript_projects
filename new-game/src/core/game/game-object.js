export class GameObject {
    constructor({x = 0, y= 0} = {}) {
        this.x = x;
        this.y = y;

        this.drawables = [];
        this.colliders = [];
        this.gameScreen = null;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Called when the object is created in the gamescreen
     */
    create() {}

    /**
     * Update the object. This function should be overridden by child classes.
     * @param {*} secondsDifference 
     */
    update(secondsDifference) {}

    /**
     * Handle collisions
     * @param {*} otherObject the object collided with
     */
    onCollision(otherObject) {}

    getInput() {
        return this.gameScreen.game.input;
    }

    getGameSize() {
        return this.gameScreen.getGameSize();
    }

    getGameMedia() {
        return this.gameScreen.game.media;
    }

    getImage(imageURL) {
        return this.getGameMedia().getImage(imageURL);
    }

    // Dont use this one. Use changeGameScreen instead. This should only be used for internals.
    setGameScreen(gameScreen) {
        this.gameScreen = gameScreen;
    }

    // Use this one to change game screens
    changeGameScreen(gameScreen) {
        this.gameScreen.game.setGameScreen(gameScreen);
    }

    /**
     * Draw all "Drawables" related to the object.
     * @param {*} secondsDifference 
     * @param {*} context2d 
     */
    draw(secondsDifference, context2d) {
        this.drawables.forEach(drawable => drawable.drawIfVisible(secondsDifference, context2d));
    }

    addDrawable(drawable, {relative = true} = {}) {
        if (relative) {
            drawable.setRelativeTo(this);
        }
        this.drawables.push(drawable);
    }

    addCollider(collider) {
        this.colliders.push(collider);
        this.gameScreen.addCollider(collider);
    }

    removeCollider(collider) {
        const idx = this.colliders.indexOf(collider);
        if (idx >= 0) {
            this.colliders.splice(idx, 1);
            this.gameScreen.removeCollider(collider);
        }
    }

    getColliders() {
        return this.colliders;
    }
}