/* globals __DEV__ */

// Import the entire 'Enemy' namespace
import Enemy from './Enemy'

class WoolfEnemyMedium extends Enemy {
  // Initalization
  constructor ({ scene, x, y }) {
    // Grabs items needed from Enemy class
    super({ scene, x, y, imageKey: 'woolfImage', health: 3, zzzAmount: 10 })
    this.key = 'woolf'
    this.name = 'woolfMedium'

    this.setupAnimations()
  }

  // Creates animations for woolf
  setupAnimations () {
    // Create woolf left run anim.
    this.scene.anims.create({
      key: 'WoolfLeftRunAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'WoolfLeftRun', { start: 0, end: 11 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf right run anim.
    this.scene.anims.create({
      key: 'WoolfRightRunAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'WoolfRightRun', { start: 0, end: 11 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf left run anim.
    this.scene.anims.create({
      key: 'WoolfLeftIdleAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'WoolfLeftIdle', { start: 0, end: 7 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf right run anim.
    this.scene.anims.create({
      key: 'WoolfRightIdleAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'WoolfRightIdle', { start: 0, end: 7 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf front asleep anim.
    this.scene.anims.create({
      key: 'WoolfAsleepFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'WoolfAsleepFront', { start: 0, end: 14 }
      ),
      frameRate: 14,
      repeat: 0
    })

    this.on('animationcomplete-WoolfAsleepFrontAnim', () => {
      this.anims.play('WoolfSleepLoopFrontAnim')
    }, this)

    // Create woolf back asleep anim.
    this.scene.anims.create({
      key: 'WoolfAsleepBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'WoolfAsleepBack', { start: 0, end: 14 }
      ),
      frameRate: 14,
      repeat: 0
    })

    this.on('animationcomplete-WoolfAsleepBackAnim', () => {
      this.anims.play('WoolfSleepLoopBackAnim')
    }, this)

    // Create woolf front loop sleep anim.
    this.scene.anims.create({
      key: 'WoolfSleepLoopFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'WoolfSleepLoopFront', { start: 0, end: 8 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf back sleep anim.
    this.scene.anims.create({
      key: 'WoolfSleepLoopBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'WoolfSleepLoopBack', { start: 0, end: 8 }
      ),
      frameRate: 14,
      repeat: -1
    })
  }
}

// Expose the WoolfEnemy class to other files
export default WoolfEnemyMedium
