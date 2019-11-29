/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class YawnCircle extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'yawnBlastCircleImage')
    this.key = 'yCircle'
    this.name = 'yCircle'

    // Calls desired functions
    this.setupAnimations()
  }

  // Creates animations for YawnBlastCircle
  setupAnimations () {
    // Create yawnBlast glassBreak anim.
    this.scene.anims.create({
      key: 'shatteringAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'breakGlass', { start: 0, end: 3 }
      ),
      frameRate: 6,
      repeat: 0
    })
  }
}

// Expose the MainPlayer class to other files
export default YawnCircle
