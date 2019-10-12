/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class Woolf extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'woolfImage')
    this.key = 'woolf'
    this.name = 'woolf'
  }
}

// Expose the MainPlayer class to other files
export default Woolf
