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

    this.physics.enable(this.player, Phaser.Physics.ARCADE) // stuck here

    // Setup the key objects
    this.setupKeyboard()

    if (__DEV__) {
      this.debugDraw.bringToTop()
    }
  }

  setupKeyboard () {
    // Setup WASD and arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.upKey.oldDown = false
    this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.leftKey.oldDown = false
    this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.downKey.oldDown = false
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.rightKey.oldDown = false
  }

  update (time, delta) {
    if (this.cursors.up.isDown || this.upKey.isDown)
    {
      this.player.setVelocityY(160)
    }
    else if (this.cursors.left.isDown || this.leftKey.isDown)
    {
      this.player.setVelocityX(-160)
    }
    else if (this.cursors.down.isDown || this.downKey.isDown)
    {
      this.player.setVelocityY(-160)
    }
    else if (this.cursors.right.isDown || this.rightKey.isDown)
    {
      this.player.setVelocityX(160)
    }
  }

  render () {
  }
}

// Expose the class TestSheepMove to other files
export default TestSheepMove
