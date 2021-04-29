import { GameObject } from '../../core/game/game-object.js';
import { DrawableImage } from '../../core/drawables/drawable-image.js';
import { CircleCollider } from '../../core/game/game-collider.js';
import { DrawableCircle } from '../../core/drawables/drawable-circle.js';
import { DrawableParticleSystem } from '../../core/drawables/drawable-particles.js';

export class Asteroid extends GameObject {
    constructor(x, y, radius, speed) {
        super({x, y});
        this.speed = speed;
        this.radius = radius;
    }

    create() {
        const size = this.radius * 2;
        this.addDrawable(new DrawableParticleSystem({
            x: this.radius,
            y: this.radius,
            particlesPerSecond: 25,
            creationBox: { width: this.radius, height: this.radius },
            particleColor: 'rgba(255, 0, 0, 0.15)',
            particleSize: 15,
            particleLifeSpanSeconds: 3 * (this.radius / 24),
            particleSpeed: { x: -5, y: 0 },
            particleGrowthRate: -10 / (this.radius / 24),
            on: true
        }));
        this.addDrawable(new DrawableParticleSystem({
            x: this.radius,
            y: this.radius,
            particlesPerSecond: 25,
            creationBox: { width: this.radius / 3, height: this.radius / 3 },
            particleColor: 'rgba(255, 255, 0, 0.15)',
            particleSize: 12,
            particleLifeSpanSeconds: 2.5 * (this.radius / 24),
            particleSpeed: { x: -5, y: 0 },
            particleGrowthRate: -8 / (this.radius / 24),
            on: true
        }));
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