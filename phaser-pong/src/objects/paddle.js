const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 50;
const PADDLE_COLOUR = 0xffffff;

export class Paddle extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y) {
        super(scene, x, y, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_COLOUR);
        this.startingPosition = { y };

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        this.body.setImmovable(true);

        this.speed = 200;
    }

    stop() {
        this.body.velocity.y = 0;
    }

    moveUp() {
        this.body.velocity.y = -this.speed;
    }

    moveDown() {
        this.body.velocity.y = this.speed;
    }

    reset() {
        this.body.position.y = this.startingPosition.y;
    }
}