// Import the entire 'phaser' namespace
import Phaser from 'phaser'

class TestSheepYawnScene extends Phaser.Scene {
  // Creates instance of player from SheepYawnMove
  init (data) {
    if (data && data.player) {
      this.player = data.player
    }

    // Default yawn circumfrance increase size
    this._yawn_scale = 1.0

    //
    this._yawn_size_check = 1.5
  }

  // Creates ellipse for yawn blast
  create () {
    this.setupKeyboard()
  }

  // Sets up keyboard, so space can be used
  // for yawn mechanic
  setupKeyboard () {
    // Setup 'space' key for interaction
    this.yawnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.yawnKey.on('down', this.createYawnBlast, this)
    this.yawnKey.on('up', this.destroyYwanBlash, this)
    this.yawnKey.oldDown = false
  }

  // Creates sheep yawn circle
  createYawnBlast () {
    // Destroys previous sheep yawn circles if they exist
    if (this.yawnBlast) { this.yawnBlast.destroy() }
    console.log('Space key is being pressed')
    this.yawnBlast = this.add.ellipse(this.player.x, this.player.y + 40, 100, 100, 0xff0000, 0.3)
    this.yawnBlast.setStrokeStyle(2)
    this._yawn_scale = 1.0
  }

  // Destroys sheep yawn circle if space key is not being pressed and
  // Yawn blast circle already exists
  destroyYwanBlash () {
    console.log('Space key released')
    if (this.yawnBlast) {
      this.yawnBlast.destroy()
    }
  }

  // Updates once per frame
  update (time, delta) {
    // Moves sheep yawn circle with player when arrowkeys/wsad keys are
    // pressed
    if (this.yawnBlast && this.yawnBlast.scale < this._yawn_size_check) {
      this.yawnBlast.setPosition(this.player.x, this.player.y + 40)
      this.yawnBlast.setScale(this._yawn_scale)
      this._yawn_scale += 0.01
    }

    // if (this.yawnBlast.scale === this._yawn_size_check) {
    //   this.yawnBlast.setStrokeStyle(8)
    // }
  }
}

// Expose the class TestSheepYawnScene to other files
export default TestSheepYawnScene
