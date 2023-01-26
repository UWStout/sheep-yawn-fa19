/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class PlayUnpressed extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'playUnpressed')
    this.key = 'playUnpress'
    this.name = 'playUnpress'
  }
}

// Expose the PlayUnpressed class to other files
export default PlayUnpressed
