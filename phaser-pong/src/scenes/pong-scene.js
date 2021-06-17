import { Ball } from '../objects/ball.js';
import { Bot } from '../objects/bot.js';
import { Player } from '../objects/player.js';

const WINNING_SCORE = 5;

export class PongScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    create() {
        this.gameOver = false;

        // Initialize Scores
        this.playerScore = 0;
        this.botScore = 0;

        // Get canvas width/height so we can find good places to put objects
        const canvasWidth = this.game.config.width;
        const canvasHeight = this.game.config.height;
        const paddleY = (canvasHeight / 2) - 25;

        // Set up game objects
        this.ball = new Ball(this, canvasWidth / 2, canvasHeight / 2);
        this.player = new Player(this, 10, paddleY);
        this.bot = new Bot(this, canvasWidth - 10, paddleY, this.ball);

        // Set up collisions
        this.physics.add.collider(this.player, this.ball);
        this.physics.add.collider(this.bot, this.ball);
        this.physics.world.on('worldbounds', this.onWorldBounds, this)

        // Set up score text
        this.playerScoreText = this.add.text(canvasWidth * (1/4), 10, this.playerScore);
        this.botScoreText = this.add.text(canvasWidth * (3/4), 10, this.playerScore);
    }

    update() {
        this.player.update();
        this.bot.update();

        if (this.gameOver) {
            this.game.scene.stop('pong');
            this.game.scene.start('title');
        }
    }

    // When the ball hits the world bounds, check if it hit the left or the right.
    // If it did, then reset the game and update score
    onWorldBounds(collider, up, down, left, right) {
        if (collider.gameObject === this.ball && (left || right)) {
            this.ball.reset();
            this.player.reset();
            this.bot.reset();

            if (right) {
                // Player scored
                this.playerScore += 1;
                this.playerScoreText.setText(this.playerScore);
            } else if (left) {
                // Bot scored
                this.botScore += 1;
                this.botScoreText.setText(this.botScore);
            }

            if (this.playerScore === WINNING_SCORE || this.botScore === WINNING_SCORE) {
                this.gameOver = true;
            }
        }
    }
}