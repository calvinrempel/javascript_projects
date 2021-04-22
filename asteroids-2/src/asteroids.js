import { AsteroidsTitleScreen } from './asteroids/game-screens/asteroids-title-screen.js';
import { Game } from './core/game/game.js';

const canvas = document.getElementById('canvas');
const titleScreen = new AsteroidsTitleScreen();

const game = new Game({
    canvas: canvas,
    width: 300,
    height: 300,
    firstGameScreen: titleScreen,
    imageURLs: [
        './media/images/asteroid.png',
        './media/images/ship.png'
    ]
});
game.start();