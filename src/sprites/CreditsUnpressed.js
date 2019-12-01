/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class CreditsUnpressed extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'creditsUnpressed')
    this.key = 'creditsUnpress'
    this.name = 'creditsUnpress'
  }
}

// Expose the CreditsUnpressed class to other files
export default CreditsUnpressed
