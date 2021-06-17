import { TitleScene } from './scenes/title-scene.js';

/**
 * A game setup using Phaser game engine.
 * https://phaser.io/
 * 
 * Phaser Basic Guide:  https://phaser.io/tutorials/getting-started-phaser3
 * Phaser First Game:   https://phaser.io/tutorials/making-your-first-phaser-3-game/part1
 * Phaser Tutorials:    https://phaser.io/news/category/tutorial
 * Phaser Examples:     https://phaser.io/examples/v3
 * Phaser API Docs:     https://newdocs.phaser.io/docs/3.55.2/
 * 
 * This file sets up the game.
 * A game has 1 or more scenes.
 * A scene has game objects.
 */


// Game Configuration (https://newdocs.phaser.io/docs/3.55.2/Phaser.Types.Core.GameConfig)
const conf = {
    type: Phaser.AUTO,
    width: 600,
    height: 300,
    physics: {
        default: 'arcade' // Enabled basic physics (collisions, gravity, bouncing, etc)
    }
}
const game = new Phaser.Game(conf);

// List all the Scenes that your game has.
game.scene.add('title', TitleScene, true) // has "true" because it auto-starts as the first scene
// game.scene.add('game', GameScene);