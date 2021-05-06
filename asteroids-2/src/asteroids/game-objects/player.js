import { DrawableCircle } from '../../core/drawables/drawable-circle.js';
import { DrawableImage } from '../../core/drawables/drawable-image.js';
import { DrawableParticleSystem } from '../../core/drawables/drawable-particles.js';
import { CircleCollider } from '../../core/game/game-collider.js';
import { GameObject } from '../../core/game/game-object.js';
import { AsteroidsGameOverScreen } from '../game-screens/asteroids-game-over-screen.js';

export class Player extends GameObject {
    constructor(x, y) {
        super({
            x: x,
            y: y
        });
        this.speed = 50;
        this.radius = 20;

        this.middleParticles = new DrawableParticleSystem({
            x: this.radius,
            y: this.radius + 15,
            particlesPerSecond: 75,
            particleColor: 'rgba(0, 255, 0, 0.2)',
            particleSize: 4,
            particleLifeSpanSeconds: 0.25,
            particleSpeed: { x: 0, y: 70 },
            particleGrowthRate: -12,
            creationBox: { width: 3, height: 1 }
        });

        this.leftParticles = new DrawableParticleSystem({
            x: this.radius - 7,
            y: this.radius + 10,
            particlesPerSecond: 75,
            particleColor: 'rgba(0, 255, 0, 0.2)',
            particleSize: 4,
            particleLifeSpanSeconds: 0.25,
            particleSpeed: { x: 15, y: 70 },
            particleGrowthRate: -12,
            creationBox: { width: 3, height: 1 }
        });

        this.rightParticles = new DrawableParticleSystem({
            x: this.radius + 7,
            y: this.radius + 10,
            particlesPerSecond: 75,
            particleColor: 'rgba(0, 255, 0, 0.2)',
            particleSize: 4,
            particleLifeSpanSeconds: 0.25,
            particleSpeed: { x: -15, y: 70 },
            particleGrowthRate: -12,
            creationBox: { width: 3, height: 1 }
        });
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
        let shouldParticlesBeOn = false;

        // Move up/down
        if (this.getInput().isKeyDown('ArrowUp')) {
            this.y -= this.speed * secondsDifference;
            shouldParticlesBeOn = true;
        } else if (this.getInput().isKeyDown('ArrowDown')) {
            this.y += this.speed * secondsDifference;
            shouldParticlesBeOn = true;
        }

        // Move left/right
        if (this.getInput().isKeyDown('ArrowLeft')) {
            this.x -= this.speed * secondsDifference;
            shouldParticlesBeOn = true;
        } else if (this.getInput().isKeyDown('ArrowRight')) {
            this.x += this.speed * secondsDifference;
            shouldParticlesBeOn = true;
        }

        if (shouldParticlesBeOn !== this.middleParticles.on) {
            if (shouldParticlesBeOn) {
                this.leftParticles.turnOn();
                this.rightParticles.turnOn();
                this.middleParticles.turnOn();
            } else {
                this.leftParticles.turnOff();
                this.rightParticles.turnOff();
                this.middleParticles.turnOff();
            }
        }
    }
}