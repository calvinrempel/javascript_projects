class ParticleSystem {
    constructor(
        x,
        y,
        particlesPerSecond,
        particleColor,
        particleSize,
        particleLifeSpanSeconds,
        particleSpeed
    ) {
        this.x = x;
        this.y = y;
        this.particlesPerSecond = particlesPerSecond;
        this.particleColor = particleColor;
        this.particleSize = particleSize;
        this.particleLifeSpanSeconds = particleLifeSpanSeconds;
        this.particleSpeed = particleSpeed;
        this.particles= [];

        this.on = false;

        setInterval(() => this.makeParticle(), 1000 / this.particlesPerSecond);
    }

    turnOn() {
        this.on = true;
    }

    makeParticle() {
        if (this.on) {
            const particle = new Particle(this.x, this.y, (new Date()).getTime(), this.particleLifeSpanSeconds);
            this.particles.push(particle);
        }
    }
    
    
    turnOff() {
        this.on = false;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    update(secondsDifference) {
        const currentTime = (new Date()).getTime();
        this.particles.forEach(particle => {
            if (particle.isAlive(currentTime)) {
                particle.x += this.particleSpeed.x;
                particle.y += this.particleSpeed.y;
            } else {
                const idx = this.particles.indexOf(particle);
                this.particles.splice(idx, 1);
            }
        });
    }

    draw(context2d) {
        context2d.fillStyle = this.particleColor;
        this.particles.forEach(particle => {
            context2d.beginPath();
            context2d.arc(particle.x, particle.y, this.particleSize, 0, Math.PI * 2);
            context2d.fill();
        });
    }
}

class Particle {
    constructor(x, y, birthday, lifeSpan) {
        this.x= x;
        this.y= y;
        this.destroyTime= birthday + (lifeSpan * 1000);
    }

    isAlive(currentTime) {
        return currentTime < this.destroyTime;
    }
}
