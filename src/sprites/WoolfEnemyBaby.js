/* globals __DEV__ */

// Import the entire 'Enemy' namespace
import Enemy from './Enemy'

class WoolfEnemyBaby extends Enemy {
  // Initalization
  constructor ({ scene, x, y }) {
    // Grabs items needed from Enemy class
    super({ scene, x, y, imageKey: 'woolfImage', health: 1, zzzAmount: 5 })
    this.key = 'woolf'
    this.name = 'woolfBaby'

    this.setupAnimations()
  }

  // Creates animations for woolf
  setupAnimations () {
    // Create woolf left run anim.
    this.scene.anims.create({
      key: 'babyWoolfLeftRunAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'babyWoolfLeftRun', { start: 0, end: 11 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf right run anim.
    this.scene.anims.create({
      key: 'babyWoolfRightRunAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'babyWoolfRightRun', { start: 0, end: 11 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf left run anim.
    this.scene.anims.create({
      key: 'babyWoolfLeftIdleAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'babyWoolfLeftIdle', { start: 0, end: 7 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf right run anim.
    this.scene.anims.create({
      key: 'babyWoolfRightIdleAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'babyWoolfRightIdle', { start: 0, end: 7 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf front asleep anim.
    this.scene.anims.create({
      key: 'babyWoolfAsleepFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'babyWoolfAsleepFront', { start: 0, end: 14 }
      ),
      frameRate: 14,
      repeat: 0
    })

    this.on('animationcomplete-babyWoolfAsleepFrontAnim', () => {
      this.anims.play('babyWoolfSleepLoopFrontAnim')
    }, this)

    // Create woolf back asleep anim.
    this.scene.anims.create({
      key: 'babyWoolfAsleepBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'babyWoolfAsleepBack', { start: 0, end: 14 }
      ),
      frameRate: 14,
      repeat: 0
    })

    this.on('animationcomplete-babyWoolfAsleepBackAnim', () => {
      this.anims.play('babyWoolfSleepLoopBackAnim')
    }, this)

    // Create woolf front loop sleep anim.
    this.scene.anims.create({
      key: 'babyWoolfSleepLoopFrontAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'babyWoolfSleepLoopFront', { start: 0, end: 8 }
      ),
      frameRate: 14,
      repeat: -1
    })

    // Create woolf back sleep anim.
    this.scene.anims.create({
      key: 'babyWoolfSleepLoopBackAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'babyWoolfSleepLoopBack', { start: 0, end: 8 }
      ),
      frameRate: 14,
      repeat: -1
    })
  }
}

// Expose the WoolfEnemy class to other files
export default WoolfEnemyBaby
