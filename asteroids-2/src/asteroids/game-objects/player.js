import { DrawableCircle } from '../../core/drawables/drawable-circle.js';
import { DrawableImage } from '../../core/drawables/drawable-image.js';
import { DrawableParticleSystem } from '../../core/drawables/drawable-particles.js';
import { CircleCollider } from '../../core/game/game-collider.js';
import { GameObject } from '../../core/game/game-object.js';
import { AsteroidsGameOverScreen } from '../game-screens/asteroids-game-over-screen.js';

export class Player extends GameObject {
    constructor(x, y) {
        super({x, y});
        this.speed = 50;
        this.radius = 20;
        this.middleParticles = new DrawableParticleSystem(
            this.radius,
            this.radius + 15,
            1000,
            'green',
            1,
            0.06,
            { x: 0, y: 5 },
            { width: 4, height: 1 }
        );

        this.leftParticles = new DrawableParticleSystem(
            this.radius - 7,
            this.radius + 10,
            100,
            'green',
            1,
            0.25,
            { x: 0.1, y: 1 },
            { width: 5, height: 5 }
        );

        this.rightParticles = new DrawableParticleSystem(
            this.radius + 7,
            this.radius + 10,
            100,
            'green',
            1,
            0.25,
            { x: 0, y: 1 },
            { width: 5, height: 5 }
        );

        this.leftParticles.turnOn();
        this.rightParticles.turnOn();
        this.middleParticles.turnOn();
    }

    create() {
        this.addDrawable(this.rightParticles);
        this.addDrawable(this.leftParticles);
        this.addDrawable(this.middleParticles);
        this.addDrawable(new DrawableImage(0, 0, 40, 40, this.getImage('./media/images/ship.png')));
        this.addCollider(new CircleCollider('PLAYER', this, this.radius, this.radius, 20, ['ASTEROID']));
    }

    onCollision(otherObject) {
        this.changeGameScreen(new AsteroidsGameOverScreen());
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