import { DrawableCircle } from '../../../asteroids-2/src/core/drawables/drawable-circle.js';
import { GameObject } from '../core/game/game-object.js';

export class TestObject extends GameObject {
    constructor(x, y) {
        super({x, y});
        this.speed = 50;
    }

    create() {
        this.addDrawable(new DrawableCircle(0, 0, 40, 'blue'));
    }

    update(secondsDifference) {
        // Move up/down
        if (this.getInput().isKeyDown('ArrowUp')) {
            this.y -= this.speed * secondsDifference;
        } else if (this.getInput().isKeyDown('ArrowDown')) {
            this.y += this.speed * secondsDifference;
        }

        // Move left/right
        if (this.getInput().isKeyDown('ArrowLeft')) {
            this.x -= this.speed * secondsDifference;
        } else if (this.getInput().isKeyDown('ArrowRight')) {
            this.x += this.speed * secondsDifference;
        }
    }
}