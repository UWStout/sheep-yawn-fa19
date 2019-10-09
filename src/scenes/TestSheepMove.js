/* globals __DEV__ */

// Import the entire 'phaser' namespace
import Phaser from 'phaser'

// Import the sprites
import Woolhemina from '..//sprites/Woolhemina'
import Woolf from '..//sprites/Woolf'
import Tree from '..//sprites/Tree'

class TestSheepMove extends Phaser.Scene {
  init (data) { }

  preload () {
    this.load.image('sheepImage', 'assets/images/woolhemina_testSprite_128.png')
    this.load.image('treeImage', 'assets/images/testTreeAsset1.png')
    this.load.image('woolfImage', 'assets/Test Art/testAsset_wolfEnemy (3).png')
  }

  create () {
    this.player = new Woolhemina({
      scene: this,
      x: 400,
      y: 350
    })
    this.testTree = new Tree({
      scene: this,
      x: 200,
      y: 300
    })
    this.testWoolf = new Woolf({
      scene: this,
      x: 500,
      y: 300
    })

    // add Woolhemina and set physics
    this.add.existing(this.player)
    this.physics.add.existing(this.player)
    this.player.body.collideWorldBounds = true
    this.player.body.setSize(50, 105, 20, 20)

    // add test tree and set physics
    this.add.existing(this.testTree)
    this.physics.add.existing(this.testTree)
    this.testTree.body.setSize(256, 256, 0, 0)
    // this.testTree = this.physics.add.staticGroup()
    this.testTree.body.setImmovable(true)
    this.testTree.body.allowGravity = false

    // Adds woolf enemy to scene
    this.add.existing(this.testWoolf)

    this.physics.add.collider(this.player, this.testTree)
    // this.game.physics.arcade.collide(this.player, this.testTree)

    // Setup the key objects
    this.setupKeyboard()

    this.scene.run('SheepYawn', { player: this.player })
    this.scene.moveAbove('SheepYawn', 'SheepMove')

    if (__DEV__) {
      this.debugDraw.bringToTop()
    }
  }

  setupKeyboard () {
    // Setup WASD and arrow keys
    this.cursors = this.input.keyboard.createCursorKeys()
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
