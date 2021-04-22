import { Asteroid } from './asteroid.js';
import { GameObject } from '../../core/game/game-object.js';

export class AsteroidSpawner extends GameObject {
    constructor() {
        super();
        this.asteroidsPerSecond = 1;
        this.nextSpawnTime = (new Date()).getTime();

        this.minAsteroidRadius = 24;
        this.maxAsteroidRadius = 48;

        this.minSpeed = 40;
        this.maxSpeed = 65;
    }

    update(secondsDifference) {
        // const currentTime = (new Date()).getTime();
        // if (currentTime > this.nextSpawnTime) {
        //     this._spawnAsteroid();
        //     const millisecondsToNextSpawn = (1000 / this.asteroidsPerSecond);
        //     this.nextSpawnTime = currentTime + millisecondsToNextSpawn;
        // }
    }

    _spawnAsteroid() {
        const gameSize = this.getGameSize();
        const radius = this._getRandomInRange(this.minAsteroidRadius, this.maxAsteroidRadius);
        const x = gameSize.width + radius;
        const y = Math.random() * gameSize.height;
        const speed = this._getRandomInRange(this.minSpeed, this.maxSpeed);

        const asteroid = new Asteroid(x, y, radius, speed);
        this.gameScreen.addGameObject(asteroid);
    }

    _getRandomInRange(min, max) {
        const sizeRange = max - min;
        return (Math.random() * sizeRange) + min;
    }
}