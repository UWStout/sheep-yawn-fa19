/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class FirePit extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'firePitImage')
    this.key = 'firePit'
    this.name = 'firePit'
    this.objectHeight = 0
    this.objectWidth = 0
    this.offsetX = 0
    this.offsetY = 0
    this.offsetChange = 0
    this.setupAnimations()
  }

  // Creates animations for fire
  setupAnimations () {
    // Create flame anim
    this.scene.anims.create({
      key: 'flames',
      frames: this.scene.anims.generateFrameNumbers(
        'flames', { start: 0, end: 3 }
      ),
      frameRate: 5,
      repeat: -1
    })
  }
}
// Expose the FirePit class to other files
export default FirePit
