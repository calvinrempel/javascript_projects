import { GameObject } from '../../core/game/game-object.js';
import { GameScreen } from '../../core/game/game-screen.js';
import { DrawableText } from '../../core/drawables/drawable-text.js';
import { AsteroidsGameScreen } from '../game-screens/asteroids-game-screen.js';

export class AsteroidsGameOverScreen extends GameScreen {
    constructor() {
        super();
    }

    create() {
        this.addGameObject(new AsteroidGameOverScreenController());
        this.setBackgroundColor('red');
    }
}

// Define a simple GameObject to control the game over screen
export class AsteroidGameOverScreenController extends GameObject {
    constructor() {
        super(0, 0);
    }

    create() {
        this.addDrawable(new DrawableText(70, 120, 'white', 'Game Over', {size: '32px', style: 'bold'}));
        this.addDrawable(new DrawableText(45, 150, 'white', 'Press Enter to Play Again', {size: '20px'}));
    }

    update(secondsDifference) {
        // Start the game when user presses enter
        if (this.getInput().wasKeyReleased('Enter')) {
            this.changeGameScreen(new AsteroidsGameScreen());
        }
    }
}