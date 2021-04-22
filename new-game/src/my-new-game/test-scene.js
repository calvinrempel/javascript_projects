import { GameScreen } from '../core/game/game-screen.js';
import { TestObject } from './test-object.js';

export class TestScreen extends GameScreen {
    constructor() {
        super();
    }

    create() {
        this.addGameObject(new TestObject());
        this.setBackgroundColor('green');
    }
}