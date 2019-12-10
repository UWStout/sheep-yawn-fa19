/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class CreditsPanel extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'creditsPanel')
    this.key = 'creditsPan'
    this.name = 'creditsPan'
  }
}

// Expose the CreditsPressed class to other files
export default CreditsPanel
