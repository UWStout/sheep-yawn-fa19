/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class YawnCircle extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, imageKey) {
    // Initialize object basics
    super(scene, x, y, 'yawnBlastCircleImage')
    this.key = 'yCircle'
    this.name = 'yCircle'
  }
}

// Expose the MainPlayer class to other files
export default YawnCircle
