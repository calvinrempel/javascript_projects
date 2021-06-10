import { GameScreen } from '../../core/game/game-screen.js';
import { Player } from '../game-objects/player.js';
import { BotPlayer } from '../game-objects/bot-player.js';
import {ball} from '../game-objects/ball.js';
import {gameboard} from '../game-objects/gameboard.js';

export class PongGameScreen extends GameScreen {
    constructor() {
        super();
        this.setBackgroundColor('black');

        
    }

    create() {
        const {height}= this.getGameSize();
        const player = new Player( 10, height/2 - 75/2  );
        this.addGameObject(player);

        const ball1 = new ball(300,150);
        this.addGameObject(ball1);

        const botPlayer = new BotPlayer( 550, height/2 - 75/2, ball1  );
        this.addGameObject(botPlayer);

        const gameBoard = new gameboard();
        this.addGameObject(gameBoard);
        ball1.onPointScored((didPlayerScore) => {
            // if player scored, add a player score to gameboard
            if(didPlayerScore=== true){
                gameBoard.addPointForPlayer();
            }

            // if bot score, add a bot score to gameboard
            else {
                gameBoard.addPointForBot();
            }

            player.reset();
            botPlayer.reset();
        });
    }
}
