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
  }
}

// Expose the WoolfEnemy class to other files
export default WoolfEnemyBaby
