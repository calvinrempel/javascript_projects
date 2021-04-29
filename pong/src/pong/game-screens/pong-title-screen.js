import { GameObject } from '../../core/game/game-object.js';
import { GameScreen } from '../../core/game/game-screen.js';
import { DrawableText } from '../../core/drawables/drawable-text.js';
import { PongGameScreen } from '../game-screens/pong-game-screen.js';

export class PongTitleScreen extends GameScreen {
    constructor() {
        super();
    }

    create() {
        this.addGameObject(new PongTitleScreenController());
        this.setBackgroundColor('black');
    }
}

// Define a simple GameObject to control the title screen
export class PongTitleScreenController extends GameObject {
    constructor() {
        super(0, 0);
    }

    create() {
        this.addDrawable(new DrawableText(50, 120, 'white', 'Pong', {size: '32px', style: 'bold'}));
        this.addDrawable(new DrawableText(65, 150, 'white', 'Press Enter to Play', {size: '20px'}));
    }

    update(secondsDifference) {
        // Start the game when user presses enter
        if (this.getInput().wasKeyReleased('Enter')) {
             this.changeGameScreen(new PongGameScreen());
        }
    }
}
