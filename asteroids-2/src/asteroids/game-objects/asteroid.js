import { GameObject } from '../../core/game/game-object.js';
import { DrawableImage } from '../../core/drawables/drawable-image.js';
import { CircleCollider } from '../../core/game/game-collider.js';
import { DrawableCircle } from '../../core/drawables/drawable-circle.js';

export class Asteroid extends GameObject {
    constructor(x, y, radius, speed) {
        super({x, y});
        this.speed = speed;
        this.radius = radius;
    }

    create() {
        const size = this.radius * 2;
        this.addDrawable(new DrawableImage(0, 0, size, size, this.getImage('./media/images/asteroid.png')));
        this.addCollider(new CircleCollider('ASTEROID', this, this.radius, this.radius, this.radius, []));
    }

    update(secondsDifference) {
        this.x -= this.speed * secondsDifference;
        this.speed += 2.5 * secondsDifference;

        if (this.x < -(this.radius * 2)) {
            this.gameScreen.removeGameObject(this);
        }
    }
}