import { PongScene } from './scenes/pong-scene.js';
import { TitleScene } from './scenes/title-scene.js';

const conf = {
    type: Phaser.AUTO,
    width: 600,
    height: 300,
    physics: {
        default: 'arcade'
    }
}

const game = new Phaser.Game(conf);
game.scene.add('title', TitleScene, true)
game.scene.add('pong', PongScene);