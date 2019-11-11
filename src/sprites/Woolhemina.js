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
    // Create left anim of Woolhemina
    this.scene.anims.create({
      key: 'runLeft',
      frames: this.scene.anims.generateFrameNumbers(
        'runleftFront', { start: 0, stop: 13 }
      ),
      frameRate: 16,
      repeat: -1
    })

    // Create up anim of Woolhemina
    this.scene.anims.create({
      key: 'runUpAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'runUp', { start: 0, stop: 13 }
      ),
      frameRate: 16,
      repeat: -1
    })

    // Create idle front anim of Woolhemina
    this.scene.anims.create({
      key: 'idleFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'idleFront', { start: 0, stop: 11 }
      ),
      frameRate: 16,
      repeat: -1
    })

    // Create idle back anim of Woolhemina
    this.scene.anims.create({
      key: 'idleBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'idleBack', { start: 0, stop: 11 }
      ),
      frameRate: 16,
      repeat: -1
    })

    // Create inital yawn front anim of Woolhemina
    this.scene.anims.create({
      key: 'initalYawnFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'initalYawnFront', { start: 0, stop: 6 }
      ),
      frameRate: 16,
      repeat: 0
    })

    // Create inital yawn back anim of Woolhemina
    this.scene.anims.create({
      key: 'initalYawnBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'initalYawnBack', { start: 0, stop: 6 }
      ),
      frameRate: 16,
      repeat: 0
    })

    // Create yawn loop front anim of Woolhemina
    this.scene.anims.create({
      key: 'yawnLoopFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'yawnLoopFront', { start: 0, stop: 5 }
      ),
      frameRate: 16,
      repeat: -1
    })

    // Create yawn loop back anim of Woolhemina
    this.scene.anims.create({
      key: 'yawnLoopBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'yawnLoopBack', { start: 0, stop: 5 }
      ),
      frameRate: 16,
      repeat: -1
    })
  }
}

// Expose the MainPlayer class to other files
export default Woolhemina
