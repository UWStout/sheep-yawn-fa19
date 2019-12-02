/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class CreditsPressed extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'creditsPressed')
    this.key = 'creditsPress'
    this.name = 'creditsPress'
  }
}

// Expose the CreditsPressed class to other files
export default CreditsPressed
