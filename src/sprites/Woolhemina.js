/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class Woolhemina extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'sheepImage')
    this.key = 'Woolhemina-main'
    this.name = 'Woolhemina-main'

    // Calls desired functions
    this.setupAnimations()
  }

  // Creates animations for Woolhemina
  setupAnimations () {
    // run left anim of Woolhemina
    this.scene.anims.create({
      key: 'runLeft',
      frames: this.scene.anims.generateFrameNumbers(
        'runleftFront', { start: 0, stop: 13 }
      ),
      frameRate: 16,
      repeat: -1
    })
  }
}

// Expose the MainPlayer class to other files
export default Woolhemina
