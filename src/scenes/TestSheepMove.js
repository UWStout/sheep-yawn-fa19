/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

// Import the main player sprite
// import MainPlayer from '..//sprites/Player'

class TestSheepMove extends Phaser.Scene {
  init (data) { }

  preload () {
    this.load.image('sheepImage', 'assets/images/woolhemina_testSprite_128.png')
  }

  create () {
    // eslint-disable-next-line prefer-const
    let sheep = this.add.image(0, 0, 'sheepImage')
    sheep.setOrigin(0, 0)

    // Setup the key objects
    this.setupKeyboard()

    if (__DEV__) {
      this.debugDraw.bringToTop()
    }
  }

  setupKeyboard () {
  }

  update (time, delta) {
  }

  render () {
  }
}

// Expose the class TestSheepMove to other files
export default TestSheepMove
