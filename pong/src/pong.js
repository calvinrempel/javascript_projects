import { PongTitleScreen } from './pong/game-screens/pong-title-screen.js';
import { Game } from './core/game/game.js';

const canvas = document.getElementById('canvas');
const titleScreen = new PongTitleScreen();

const game = new Game({
    canvas: canvas,
    width: 300,
    height: 300,
    firstGameScreen: titleScreen,
    imageURLs: []
});
game.start();