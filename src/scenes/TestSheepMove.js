/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

// Import the main player sprite
import Woolhemina from '..//sprites/Woolhemina'

class TestSheepMove extends Phaser.Scene {
  init (data) { }

  preload () {
    this.load.image('sheepImage', 'assets/images/woolhemina_testSprite_128.png')
  }

  create () {
    this.player = new Woolhemina({
      scene: this,
      x: 100,
      y: 100
    })

    this.add.existing(this.player)

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
