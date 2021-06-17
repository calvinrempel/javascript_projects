export class TitleScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    create() {
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        const canvasWidth = this.game.config.width;
        const canvasHeight = this.game.config.height;

        // Set up title text
        this.add.text(canvasWidth / 2 - 32, canvasHeight / 2 - 24, "PONG").setStyle({fontStyle: 'bold', fontSize: '24px'});
        this.add.text(canvasWidth / 2 - 90, canvasHeight * (2.5/4) - 24, "Press Enter To Play");
    }

    update() {
        if (this.enterKey.isDown) {
            this.game.scene.stop('title');
            this.game.scene.start('pong');
        }
    }
}