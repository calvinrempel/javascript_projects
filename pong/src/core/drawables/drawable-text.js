import { GameDrawable } from '../game/game-drawable.js'

export class DrawableText extends GameDrawable {
    constructor(x, y, color, text, { family = 'serif', size = '12px', style = 'normal' } = {}) {
        super();
        this.setPosition(x, y);
        this.color = color;
        this.fontStyle = `${style} ${size} ${family}`;
        this.text = text;
    }

    draw(secondsDiff, context2d) {
        let t = this.text;
        if (typeof this.text === 'function') {
            t = this.text();
        }

        const {x, y} = this.getPosition();
        context2d.font = this.fontStyle;
        context2d.fillStyle = this.color;
        context2d.fillText(t, x, y);
    }
}