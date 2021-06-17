const BALL_RADIUS = 5;
const BALL_COLOUR = 0xffffff;

export class Ball extends Phaser.GameObjects.Ellipse {
    constructor(scene, x, y) {
        super(scene, x, y, BALL_RADIUS * 2, BALL_RADIUS * 2, BALL_COLOUR);
        this.startingPosition = { x, y };

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.collideWorldBounds = true;
        this.body.onWorldBounds = true;
        this.body.bounce.set(1.05);

        this.reset();
    }

    reset() {
        this.body.position.x = this.startingPosition.x;
        this.body.position.y = this.startingPosition.y;

        this.startMoving();
    }

    startMoving() {
        const initialDirections = {
            1: (Math.PI / 4),
            2: (Math.PI / 4) * 3,
            3: (Math.PI / 4) * 5,
            4: (Math.PI / 4) * 7,
        }
        const direction = initialDirections[Math.ceil(Math.random() * 4)];
        const speed = 200;

        this.body.velocity.x = Math.cos(direction) * speed;
        this.body.velocity.y = Math.sin(direction) * speed;
    }
}