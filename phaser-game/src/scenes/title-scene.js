/**
 * Scenes extend Phaser.Scene (https://newdocs.phaser.io/docs/3.55.2/Phaser.Scene)
 * We don't need to import Phaser, because it is included in index.html for all files.
 */
export class TitleScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    create() {
        // We need to add keys that we want to get input from. So we add the "enter" key so that we can check
        // in "update" if it's been pressed.
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        const canvasWidth = this.game.config.width;
        const canvasHeight = this.game.config.height;

        // Set up title
        this.add.text(canvasWidth / 2 - 76, canvasHeight / 2 - 24, "Phaser Game").setStyle({fontStyle: 'bold', fontSize: '24px'});
        this.add.text(canvasWidth / 2 - 90, canvasHeight * (2.5/4) - 24, "Press Enter To Play");
    }

    update() {
        if (this.enterKey.isDown) {
            /**
             * More than once scene can run at the same time. Since we are switching scenes,
             * we need to stop this one and start the next on.
             * The scene names (eg "title") are the same names we used when listing them in game.js
             */
            this.game.scene.stop('title');
            //this.game.scene.start('game');
        }
    }
}