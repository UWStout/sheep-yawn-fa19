/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class House extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'HouseClosedOff')
    this.key = 'house'
    this.name = 'house'
    this.objectHeight = 0
    this.objectWidth = 0
    this.offsetX = 0
    this.offsetY = 0
    this.offsetChange = 0
  }
}

// Expose the FirePit class to other files
export default House
