import { GameDrawable } from '../game/game-drawable.js'

export class DrawableRectangle extends GameDrawable {
    constructor(x, y, width, height, color) {
        super();
        this.setPosition(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    setColor(color) {
        this.color = color;
    }

    draw(secondsDiff, context2d) {
        const {x, y} = this.getPosition();
        context2d.fillStyle = this.color;
        context2d.fillRect(x, y, this.width, this.height);
    }
}