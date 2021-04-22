import { GameDrawable } from '../game/game-drawable.js'

export class DrawableImage extends GameDrawable {
    constructor(x, y, width, height, image) {
        super();
        this.setPosition(x, y);
        this.width = width;
        this.height = height;
        this.image = image;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    draw(secondsDiff, context2d) {
        const {x, y} = this.getPosition();
        context2d.drawImage(this.image, x, y, this.width, this.height);
    }
}