import { GameScreen } from '../../core/game/game-screen.js';
import { Player } from '../game-objects/player.js';

export class PongGameScreen extends GameScreen {
    constructor() {
        super();
        this.setBackgroundColor('black');

        
    }

    create() {
        const {height}= this.getGameSize();
        const player = new Player();
        this.addGameObject(player);

    }
}
