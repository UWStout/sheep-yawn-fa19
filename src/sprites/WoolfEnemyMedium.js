/* globals __DEV__ */

// Import the entire 'Enemy' namespace
import Enemy from './Enemy'

class WoolfEnemyMedium extends Enemy {
  // Initalization
  constructor ({ scene, x, y }) {
    // Grabs items needed from Enemy class
    super({ scene, x, y, imageKey: 'woolfImage' })
    this.key = 'woolf'
    this.name = 'woolf'
    this.Health = 3
    this.zCount = 10

    this.setupAnimations()
  }

  // Creates animations for woolf
  setupAnimations () {
    // Create woolf left run anim.
    this.scene.anims.create({
      key: 'woolfLeftRunAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'woolfLeftRun', { start: 0, end: 11 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf right run anim.
    this.scene.anims.create({
      key: 'woolfRightRunAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'woolfRightRun', { start: 0, end: 11 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf left run anim.
    this.scene.anims.create({
      key: 'woolfLeftIdleAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'woolfLeftIdle', { start: 0, end: 7 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf right run anim.
    this.scene.anims.create({
      key: 'woolfRightIdleAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'woolfRightIdle', { start: 0, end: 7 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf front asleep anim.
    this.scene.anims.create({
      key: 'woolfAsleepFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'woolfAsleepFront', { start: 0, end: 14 }
      ),
      frameRate: 14,
      repeat: 0
    })

    this.on('animationcomplete-woolfAsleepFrontAnim', () => {
      this.anims.play('woolfSleepLoopFrontAnim')
    }, this)

    // Create woolf back asleep anim.
    this.scene.anims.create({
      key: 'woolfAsleepBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'woolfAsleepBack', { start: 0, end: 14 }
      ),
      frameRate: 14,
      repeat: 0
    })

    this.on('animationcomplete-woolfAsleepBackAnim', () => {
      this.anims.play('woolfSleepLoopBackAnim')
    }, this)

    // Create woolf front loop sleep anim.
    this.scene.anims.create({
      key: 'woolfSleepLoopFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'woolfSleepLoopFront', { start: 0, end: 8 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf back sleep anim.
    this.scene.anims.create({
      key: 'woolfSleepLoopBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'woolfSleepLoopBack', { start: 0, end: 8 }
      ),
      frameRate: 14,
      repeat: -1
    })
  }
}

// Expose the WoolfEnemy class to other files
export default WoolfEnemyMedium
