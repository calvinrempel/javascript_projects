import { DefaultLoadingGameScreen } from '../default-screens/default-loading-game-screen.js';
import { GameInput } from './game-input.js';
import { GameMedia } from './game-media.js';

export class Game {
    constructor({
        canvas,
        width,
        height,
        firstGameScreen,
        imageURLs,
        loadingGameScreen = new DefaultLoadingGameScreen()}
    ) {
        this.canvas = canvas;
        this.context2d = this.canvas.getContext('2d');

        this.canvas.width = width;
        this.canvas.height = height;
        this.input = new GameInput();
        this.media = new GameMedia();

        this.lastTime = null;
        this.setGameScreen(loadingGameScreen);

        this.media.addImages(imageURLs);
        this.media.load(() => {
            this.setGameScreen(firstGameScreen);
        });
    }

    setGameScreen(gameScreen) {
        this.nextGameScreen = gameScreen;
    }

    start() {
        this.lastTime = performance.now();
        requestAnimationFrame(() => this._executeGameFrame(performance.now()));
    }

    _executeGameFrame(timestamp) {
        const timeDiff = timestamp - this.lastTime;
        const secondsDiff = timeDiff / 1000;

        if (this.nextGameScreen) {
            this.nextGameScreen.setGame(this);
            this.gameScreen = this.nextGameScreen;
            this.gameScreen.create();
            this.nextGameScreen = null;
        }

        this.gameScreen.update(secondsDiff);
        this.gameScreen.draw(secondsDiff, this.context2d);
        this.input.update();

        this.lastTime = performance.now();
        requestAnimationFrame((timestamp) => this._executeGameFrame(timestamp));
    }
}