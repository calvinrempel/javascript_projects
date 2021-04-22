import { Game } from './core/game/game.js';
import { TestScreen } from './my-new-game/test-scene.js';

const canvas = document.getElementById('canvas');
const titleScreen = new TestScreen();

const game = new Game({
    canvas: canvas,
    width: 300,
    height: 300,
    firstGameScreen: titleScreen,
    imageURLs: []
});
game.start();