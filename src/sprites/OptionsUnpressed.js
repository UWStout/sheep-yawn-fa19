/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class OptionsUnpressed extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'optionsUnpressed')
    this.key = 'optUnpress'
    this.name = 'optUnpress'
  }
}

// Expose the OptionsUnpressed class to other files
export default OptionsUnpressed
