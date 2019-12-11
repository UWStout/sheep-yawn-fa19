/* globals __DEV__ */

// Import the entire 'Enemy' namespace
import Enemy from './Enemy'

class WoolfEnemyBig extends Enemy {
  // Initalization
  constructor ({ scene, x, y }) {
    // Grabs items needed from Enemy class
    super({ scene, x, y, imageKey: 'imageKey', health: 5, zzzAmount: 15 })
    this.key = 'woolf'
    this.name = 'woolfBig'

    this.setupAnimations()
  }

  // Creates animations for woolf
  setupAnimations () {
    // Create woolf left run anim.
    this.scene.anims.create({
      key: 'alphaWoolfLeftRunAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'alphaWoolfLeftRun', { start: 0, end: 11 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf right run anim.
    this.scene.anims.create({
      key: 'alphaWoolfRightRunAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'alphaWoolfRightRun', { start: 0, end: 11 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf left run anim.
    this.scene.anims.create({
      key: 'alphaWoolfLeftIdleAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'alphaWoolfLeftIdle', { start: 0, end: 7 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf right run anim.
    this.scene.anims.create({
      key: 'alphaWoolfRightIdleAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'alphaWoolfRightIdle', { start: 0, end: 7 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf front asleep anim.
    this.scene.anims.create({
      key: 'alphaWoolfAsleepFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'alphaWoolfAsleepFront', { start: 0, end: 14 }
      ),
      frameRate: 14,
      repeat: 0
    })

    this.on('animationcomplete-alphaWoolfAsleepFrontAnim', () => {
      this.anims.play('alphaWoolfSleepLoopFrontAnim')
    }, this)

    // Create woolf back asleep anim.
    this.scene.anims.create({
      key: 'alphaWoolfAsleepBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'alphaWoolfAsleepBack', { start: 0, end: 14 }
      ),
      frameRate: 14,
      repeat: 0
    })

    this.on('animationcomplete-alphaWoolfAsleepBackAnim', () => {
      this.anims.play('alphaWoolfSleepLoopBackAnim')
    }, this)

    // Create woolf front loop sleep anim.
    this.scene.anims.create({
      key: 'alphaWoolfSleepLoopFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'alphaWoolfSleepLoopFront', { start: 0, end: 8 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf back sleep anim.
    this.scene.anims.create({
      key: 'alphaWoolfSleepLoopBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'alphaWoolfSleepLoopBack', { start: 0, end: 8 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf front loop sleep anim.
    this.scene.anims.create({
      key: 'alphaWoolfAttackFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'alphaWoolfAttackFront', { start: 0, end: 15 }
      ),
      frameRate: 14,
      repeat: 0
    })

    // Create woolf back sleep anim.
    this.scene.anims.create({
      key: 'alphaWoolfAttackBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'alphaWoolfAttackBack', { start: 0, end: 15 }
      ),
      frameRate: 14,
      repeat: 0
    })
  }
}

// Expose the WoolfEnemy class to other files
export default WoolfEnemyBig
