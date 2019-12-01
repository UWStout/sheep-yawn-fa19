/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class OptionsPressed extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'optionsPressed')
    this.key = 'optPress'
    this.name = 'optPress'
  }
}

// Expose the OptionsPressed class to other files
export default OptionsPressed
