import { PongTitleScreen } from './pong/game-screens/pong-title-screen.js';
import { PongGameScreen } from './pong/game-screens/pong-game-screen.js';
import { Game } from './core/game/game.js';

const canvas = document.getElementById('canvas');
// const titleScreen = new PongTitleScreen();
const gameScreen = new PongGameScreen();

const game = new Game({
    canvas: canvas,
    width: 300,
    height: 300,
    firstGameScreen: gameScreen,
    imageURLs: []
});
game.start();