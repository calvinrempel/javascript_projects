import { GameScreen } from '../../core/game/game-screen.js';
import { Player } from '../game-objects/player.js';

export class PongGameScreen extends GameScreen {
    constructor() {
        super();
        this.setBackgroundColor('black');

        
    }

    create() {
        const {height}= this.getGameSize();
        const player = new Player( 10, height/2 - 75/2  );
        this.addGameObject(player);

        const player2 = new Player( 250, height/2 - 75/2  );
        this.addGameObject(player2);
    }
}
