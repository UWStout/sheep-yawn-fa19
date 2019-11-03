/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class Zzz extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'zzzImage')
    this.key = 'zzz'
    this.name = 'zzz'
  }
}

// Expose the MainPlayer class to other files
export default Zzz
