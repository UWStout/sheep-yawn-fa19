/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class Woolf extends Phaser.GameObjects.Sprite {
  constructor ({ scene, x, y }) {
    // Initialize object basics
    super(scene, x, y, 'woolfImage')
    this.key = 'woolf'
    this.name = 'woolf'
  }

  // Creates animations for Woolhemina
  // setupAnimations () {
  //   // Create woolf left run anim.
  //   this.scene.anims.create({
  //     key: 'woolfLeftRunAnim',
  //     frames: this.scene.anims.generateFrameNumbers(
  //       'woolfLeftRun', { start: 0, end: 11 }
  //     ),
  //     frameRate: 16,
  //     repeat: -1
  //   })
  // }
}

// Expose the MainPlayer class to other files
export default Woolf
