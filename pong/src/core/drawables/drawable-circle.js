import { GameDrawable } from '../game/game-drawable.js'

export class DrawableCircle extends GameDrawable {
    constructor(x, y, radius, color) {
        super();
        this.setPosition(x, y);
        this.radius = radius;
        this.color = color;
    }

    setColor(color) {
        this.color = color;
    }

    draw(secondsDiff, context2d) {
        const {x, y} = this.getPosition();
        context2d.fillStyle = this.color;
        context2d.beginPath();
        context2d.arc(x, y, this.radius, 0, Math.PI * 2);
        context2d.fill();
    }
}