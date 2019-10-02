// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class TestSheepYawnScene extends Phaser.Scene {
  init (data) {
    if (data && data.player) {
      this.player = data.player
    }
  }

  // Creates ellipse for yawn blast
  create () {
    this.setupKeyboard()
    // let yawnBlast = this.add.ellipse()
    // let yawnBlast = this.add.ellipse(this.player.x, this.player.y + 40, 100, 100, 0xff0000, 0.3)
    // yawnBlast.setStrokeStyle(2)
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
      this.yawnBlast = this.add.ellipse(this.player.x, this.player.y + 40, 100, 100, 0xff0000, 0.3)
      this.yawnBlast.setStrokeStyle(2)
    } else {
      // this.yawnBlast.destroy()
    }
  }
}

// Expose the class TestSheepYawnScene to other files
export default TestSheepYawnScene
