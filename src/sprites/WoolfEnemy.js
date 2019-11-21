/* globals __DEV__ */

// Import the entire 'Enemy' namespace
import Enemy from './Enemy'

class WoolfEnemy extends Enemy {
  // Initalization
  constructor ({ scene, x, y, health, zzzAmount }) {
    // Grabs items needed from Enemy class
    super({ scene, x, y, imageKey: 'woolfImage', health, zzzAmount })
    this.key = 'woolf'
    this.name = 'woolf'
  }

  // Creates animations for woolf
  setupAnimations () {
    // Create woolf left run anim.
    this.scene.anims.create({
      key: 'woolfLeftRunAnim',
      frames: this.scene.anims.generateFrameNumbers(
        'woolfLeftRun', { start: 0, end: 11 }
      ),
      frameRate: 16,
      repeat: -1
    })
  }
}

// Expose the MainPlayer class to other files
export default WoolfEnemy
