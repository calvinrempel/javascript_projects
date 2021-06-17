import { Paddle } from './paddle.js';

export class Bot extends Paddle {
    constructor(scene, x, y, ball) {
        super(scene, x, y);

        this.ball = ball;
    }

    update() {
        this.stop();

        const isBallMovingUp = this.ball.body.velocity.y < 0;
        const isBallMovingDown = this.ball.body.velocity.y > 0;
        const isBallAbovePaddle = this.ball.body.position.y < this.body.position.y;

        // Move up/down
        if (isBallMovingUp && isBallAbovePaddle) {
            this.moveUp();
        } else if (isBallMovingDown && !isBallAbovePaddle) {
            this.moveDown();
        }
    }
}