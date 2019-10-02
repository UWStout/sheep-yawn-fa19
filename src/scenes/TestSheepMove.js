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

    this.physics.add.existing(this.player)

    // Setup the key objects
    this.setupKeyboard()

    // this.scene.run('SheepYawn')

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
    const velocity = { x: 0.0, y: 0.0 }
    if (this.cursors.up.isDown || this.upKey.isDown)
    {
      velocity.y -= 160
      velocity.x = 0
    }
    if (this.cursors.down.isDown || this.downKey.isDown)
    {
      velocity.y += 160
      velocity.x = 0
    }
    if (this.cursors.right.isDown || this.rightKey.isDown)
    {
      velocity.x += 160
      velocity.y = 0
    }
    if (this.cursors.left.isDown || this.leftKey.isDown)
    {
      velocity.x -= 160
      velocity.y = 0
    }

    this.player.body.velocity.set(velocity.x, velocity.y)
  }

  render () {
  }
}

// Expose the class TestSheepMove to other files
export default TestSheepMove
