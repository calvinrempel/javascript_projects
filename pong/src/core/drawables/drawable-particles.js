import { GameDrawable } from "../game/game-drawable.js";

export class DrawableParticleSystem extends GameDrawable {
    constructor({
        x = 0,
        y = 0,
        particlesPerSecond = 100,
        particleColor = 'green',
        particleSize = 2,
        particleLifeSpanSeconds = 1,
        particleSpeed = { x: 0, y: 1 },
        particleGrowthRate = 1,
        creationBox = { width: 10, height: 10},
        on = false
    } = {}) {
        super();
        this.setPosition(x, y);
        this.particlesPerSecond = particlesPerSecond;
        this.particleColor = particleColor;
        this.particleSize = particleSize;
        this.particleLifeSpanSeconds = particleLifeSpanSeconds;
        this.particleSpeed = particleSpeed;
        this.particleGrowthRate = particleGrowthRate;
        this.creationBox = creationBox;

        this.particles= [];
        this.on = on;

        setInterval(() => this.makeParticle(), 1000 / this.particlesPerSecond);
    }

    turnOn() {
        this.on = true;
    }

    makeParticle() {
        if (this.on) {
            const position = this.getPosition();
            const xRandom = Math.random() * this.creationBox.width;
            const yRandom = Math.random() * this.creationBox.height;

            const x = (position.x + xRandom) - (this.creationBox.width / 2);
            const y = (position.y + yRandom) - (this.creationBox.height / 2);

            const particle = new Particle(x, y, (new Date()).getTime(), this.particleLifeSpanSeconds, this.particleSize);
            this.particles.push(particle);
        }
    }
    
    
    turnOff() {
        this.on = false;
    }

    draw(secondsDiff, context2d) {
        const currentTime = (new Date()).getTime();
        this.particles.forEach(particle => {
            if (particle.isAlive(currentTime)) {
                particle.x += this.particleSpeed.x * secondsDiff;
                particle.y += this.particleSpeed.y * secondsDiff;
                particle.radius = Math.max(0, particle.radius + this.particleGrowthRate * secondsDiff);
            } else {
                const idx = this.particles.indexOf(particle);
                this.particles.splice(idx, 1);
            }
        });

        const circleAngle = Math.PI * 2;
        context2d.fillStyle = this.particleColor;
        this.particles.forEach(particle => {
            context2d.beginPath();
            context2d.arc(particle.x, particle.y, particle.radius, 0, circleAngle);
            context2d.fill();
        });
        
    }
}

class Particle {
    constructor(x, y, birthday, lifeSpan, radius) {
        this.x= x;
        this.y= y;
        this.radius = radius;
        this.destroyTime= birthday + (lifeSpan * 1000);
    }

    isAlive(currentTime) {
        return currentTime < this.destroyTime;
    }
}
