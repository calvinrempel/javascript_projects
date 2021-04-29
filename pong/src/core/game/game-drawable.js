export class GameDrawable {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.visible = true;
        this.relativeTo = null;
    }

    setRelativeTo(position) {
        this.relativeTo = position;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    getPosition() {
        let x = this.x;
        let y = this.y;

        if (this.relativeTo) {
            x += this.relativeTo.x;
            y += this.relativeTo.y;
        }
        return { x, y };
    }

    setVisible(visible) {
        this.visible = visible;
    }

    drawIfVisible(secondsDifference, context2d) {
        if (this.visible) {
            this.draw(secondsDifference, context2d);
        }
    }

    /**
     * Override to draw different things
     * @param {*} secondsDifference 
     * @param {*} context2d 
     */
    draw(secondsDifference, context2d) {}
}