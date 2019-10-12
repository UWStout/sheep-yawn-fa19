/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class Woolhemina extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'sheepImage')
    this.key = 'Woolhemina-main'
    this.name = 'Woolhemina-main'
  }
}

// Expose the MainPlayer class to other files
export default Woolhemina
