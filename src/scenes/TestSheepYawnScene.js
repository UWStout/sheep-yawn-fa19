// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class TestSheepYawnScene extends Phaser.Scene {
  create () {
    this.setupKeyboard()
  }

  // Sets up keyboard, so space can be used
  // for yawn mechanic
  setupKeyboard () {
    // Handy way to setup cursor keys (and spacebar and shift)
    this.cursors = this.input.keyboard.createCursorKeys()

    // Setup 'space' key for interaction
    this.yawnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.yawnKey.oldDown = false
  }

  // Updates once per frame
  update (time, delta) {
    // Checks for space key input
    if (this.yawnKey.isDown && !this.yawnKey.oldDown) {
      console.log('Space key is being pressed')
    }
  }

  create () {
    let yawnBlast = this.add.ellipse(this.x, this.y, 10, 10)
    yawnBlast.setFillStyle()
  }
}

// Expose the class TestSheepYawnScene to other files
export default TestSheepYawnScene
