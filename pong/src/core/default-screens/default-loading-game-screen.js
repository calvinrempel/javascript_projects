import { GameScreen } from '../game/game-screen.js';
import { DrawableText } from '../drawables/drawable-text.js';
import { GameObject } from '../game/game-object.js';

export class DefaultLoadingGameScreen extends GameScreen {
    constructor() {
        super();
        this.loadingObj = null;
        this.setBackgroundColor('black');
    }

    create() {
        const { width, height } = this.getGameSize();
        this.loadingObj = new DefaultLoadingScreenObject(width, height);
        this.addGameObject(this.loadingObj);
    }
}

export class DefaultLoadingScreenObject extends GameObject {
    constructor(width, height) {
        super();

        const fontSizePx = 16;
        const textY = (height / 2) + (fontSizePx / 2);
        const textX = (width / 2) - 40;
        this.addDrawable(new DrawableText(textX, textY, 'white', 'Loading...', {size: `${fontSizePx}px`}));
    }
}