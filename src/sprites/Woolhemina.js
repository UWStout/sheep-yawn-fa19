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

    // run up anim of Woolhemina
    this.scene.anims.create({
      key: 'runUpAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'runUp', { start: 0, stop: 13 }
      ),
      frameRate: 16,
      repeat: -1
    })

    // run idle front anim of Woolhemina
    this.scene.anims.create({
      key: 'idleFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'idleFront', { start: 0, stop: 11 }
      ),
      frameRate: 16,
      repeat: -1
    })

    // run idle back anim of Woolhemina
    this.scene.anims.create({
      key: 'idleBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'idleBack', { start: 0, stop: 11 }
      ),
      frameRate: 16,
      repeat: -1
    })
  }
}

// Expose the MainPlayer class to other files
export default Woolhemina
