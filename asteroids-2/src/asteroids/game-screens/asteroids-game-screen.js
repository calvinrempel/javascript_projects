import { GameScreen } from '../../core/game/game-screen.js';
import { Player } from '../game-objects/player.js';
import { AsteroidSpawner } from '../game-objects/asteroid-spawner.js';

export class AsteroidsGameScreen extends GameScreen {
    constructor() {
        super();
    }

    create() {
        const { height } = this.getGameSize();

        // Create and add player to the game
        const player = new Player(50, height / 2);
        this.addGameObject(player);

        // Create and add AsteroidSpawner to the game
        const asteroidSpawner = new AsteroidSpawner();
        this.addGameObject(asteroidSpawner);

        // Set a background color
        this.setBackgroundColor('black');
    }
}