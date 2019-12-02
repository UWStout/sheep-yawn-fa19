/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class PlayPressed extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'playPressed')
    this.key = 'playPress'
    this.name = 'playPress'
  }
}

// Expose the PlayPressed class to other files
export default PlayPressed
