import { Paddle } from './paddle.js';

export class Player extends Paddle {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.keys = {
            upArrow: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            downArrow: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        };
    }

    update() {
        this.stop();

        if (this.keys.upArrow.isDown) {
            this.moveUp();
        } else if (this.keys.downArrow.isDown) {
            this.moveDown();
        }
    }
}