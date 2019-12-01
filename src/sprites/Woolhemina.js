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
        'runleftFront', { start: 0, end: 13 }
      ),
      frameRate: 16,
      repeat: -1
    })

    // Create up anim of Woolhemina
    this.scene.anims.create({
      key: 'runUpAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'runUp', { start: 0, end: 13 }
      ),
      frameRate: 16,
      repeat: -1
    })

    // Create idle front anim of Woolhemina
    this.scene.anims.create({
      key: 'idleFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'idleFront', { start: 0, end: 10 }
      ),
      frameRate: 12,
      repeat: -1
    })

    // Create idle back anim of Woolhemina
    this.scene.anims.create({
      key: 'idleBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'idleBack', { start: 0, end: 10 }
      ),
      frameRate: 12,
      repeat: -1
    })

    // Create inital yawn front anim of Woolhemina
    this.scene.anims.create({
      key: 'initalYawnFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'initalYawnFront', { start: 0, end: 6 }
      ),
      frameRate: 12,
      repeat: 0
    })

    // Was the last animation the inital front yawn animation?
    // Run front loop yawn if so
    this.on('animationcomplete-initalYawnFrontAnim', () => {
      this.anims.play('YawnLoopFrontAnim')
    }, this)

    // Create inital yawn back anim of Woolhemina
    this.scene.anims.create({
      key: 'initalYawnBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'initalYawnBack', { start: 0, end: 6 }
      ),
      frameRate: 12,
      repeat: 0
    })

    // Was the last animation the inital back yawn animation?
    // Run back loop yawn if so
    this.on('animationcomplete-initalYawnBackAnim', () => {
      this.anims.play('YawnLoopBackAnim')
    }, this)

    // Create yawn loop front anim of Woolhemina
    this.scene.anims.create({
      key: 'YawnLoopFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'YawnLoopFront', { start: 0, end: 5 }
      ),
      frameRate: 12,
      repeat: -1
    })

    // Create yawn loop back anim of Woolhemina
    this.scene.anims.create({
      key: 'YawnLoopBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'YawnLoopBack', { start: 0, end: 5 }
      ),
      frameRate: 12,
      repeat: -1
    })

    // Create inital yawn back anim of Woolhemina
    this.scene.anims.create({
      key: 'YawnReleaseFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'YawnReleaseFront', { start: 0, end: 14 }
      ),
      frameRate: 12,
      repeat: 0
    })

    this.on('animationcomplete-YawnReleaseFrontAnim', () => {
      this.anims.play('idleFrontAnim')
      // Run this off of yawnCircle break object/sprite
      // this.anims.play('shatteringAnim')
    }, this)

    // Create inital yawn back anim of Woolhemina
    this.scene.anims.create({
      key: 'YawnReleaseBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'YawnReleaseBack', { start: 0, end: 15 }
      ),
      frameRate: 12,
      repeat: 0
    })

    this.on('animationcomplete-YawnReleaseBackAnim', () => {
      this.anims.play('idleBackAnim')
    }, this)
  }
}

// Expose the Woolhemina class to other files
export default Woolhemina
